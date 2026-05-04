import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getToday } from "@/shared/lib/date";
import {
  createNamespacedStorage,
  STORE_VERSION,
} from "@/store/sharedPersist";

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
       * TOGGLE TASK
       */
      toggleTask: (id: EntityId) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),

      /**
       * ADD TASK
       */
      addTask: (input: CreateTaskInput) =>
        set((state) => {
          const newTask: Task = {
            id: crypto.randomUUID(),
            completed: false,
            date: input.date ?? getToday() ?? new Date().toISOString().split("T")[0]!,
            ...input,
          };

          return {
            tasks: [...state.tasks, newTask],
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
        const s = (persisted as any) ?? {};
        const todayDate = getToday();

        return {
          tasks: s.tasks.map((task: Task) => {
            if ('completedDates' in task) {
              return {
                ...task,
                completed: (task as any).completedDates.includes(todayDate),
                completedDates: undefined,
              };
            }
            return task;
          }),
        } as TasksState;
      },
    }
  )
);
