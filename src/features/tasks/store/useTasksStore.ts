import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createId } from "@/shared/lib/id";
import { getToday, type DateKey } from "@/shared/lib/date";
import {
  createNamespacedStorage,
  STORE_VERSION,
} from "@/store/sharedPersist";

import { toggleTaskCompletion } from "@/features/tasks/api";
import { useActivityStore } from "@/features/activity/useActivityStore";
import { createActivityEvent } from "@/features/activity/activity.utils";

import type {
  CreateTaskInput,
  EntityId,
  Task,
  TasksState,
} from "@/features/tasks/types/types";

export const useTasksStore = create<TasksState>()(
  persist(
    (set) => ({
      tasks: [],

      /**
       * TOGGLE TASK (per date)
       */
      toggleTask: (id: EntityId, date: DateKey) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === id);
          const isCompleting = task && !task.completedDates.includes(date);
          
          const updatedTasks = state.tasks.map((t) =>
            t.id === id
              ? toggleTaskCompletion(t, date)
              : t
          );

          // Track activity if completing
          if (isCompleting && task) {
            useActivityStore.getState().addEvent(
              createActivityEvent("task_completed", `Completed task: ${task.label}`)
            );
          }

          return {
            tasks: updatedTasks,
          };
        }),

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

          // Track activity
          useActivityStore.getState().addEvent(
            createActivityEvent("task_created", `Created task: ${input.label}`)
          );

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
