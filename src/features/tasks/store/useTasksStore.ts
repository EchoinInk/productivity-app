import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createId } from "@/shared/lib/id";
import { getToday, type DateKey } from "@/shared/lib/date";
import {
  createNamespacedStorage,
  STORE_VERSION,
} from "@/store/sharedPersist";

import {
  toggleTaskCompletion, // ✅ NEW (from domain)
} from "@/features/tasks/api";

import type {
  CreateTaskInput,
  EntityId,
  Task,
  TasksState,
} from "@/features/tasks/types";

export const useTasksStore = create<TasksState>()(
  persist(
    (set) => ({
      tasks: [],

      /**
       * TOGGLE TASK (per date)
       * ✅ Now fully delegated to domain
       */
      toggleTask: (id: EntityId, date: DateKey) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? toggleTaskCompletion(task, date)
              : task
          ),
        })),

      /**
       * ADD TASK
       */
      addTask: (input: CreateTaskInput) =>
        set((state) => {
          const newTask: Task = {
            id: createId(),

            label: input.label,
            date: input.date ?? getToday(),

            time: input.time,
            recurrence: input.recurrence ?? "none",
            category: input.category,
            notes: input.notes,

            completedDates: [],
            createdAt: new Date().toISOString(),
          };

          return {
            tasks: [newTask, ...state.tasks],
          };
        }),

      /**
       * UPDATE TASK
       */
      updateTask: (id: EntityId, updates: Partial<Task>) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),

      /**
       * DELETE TASK
       */
      deleteTask: (id: EntityId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),

    {
      name: "tasks",
      version: STORE_VERSION,

      storage: createNamespacedStorage<
        Pick<TasksState, "tasks">
      >(["tasks"]),

      partialize: (state) => ({
        tasks: state.tasks,
      }),

      /**
       * MIGRATION (safe)
       */
      migrate: (persisted) => {
        const s = (persisted as Partial<TasksState>) ?? {};

        return {
          ...s,
          tasks: (s.tasks ?? []).map((t) => ({
            ...t,
            completedDates: t.completedDates ?? [],
            createdAt:
              t.createdAt ?? new Date().toISOString(),
          })),
        } as TasksState;
      },
    }
  )
);
