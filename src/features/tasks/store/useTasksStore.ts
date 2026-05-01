import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getToday } from "@/shared/lib/date";
import {
  createNamespacedStorage,
  STORE_VERSION,
} from "@/store/sharedPersist";

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
       * TOGGLE TASK
       */
      toggleTask: (id: EntityId) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === id);
          const isCompleting = task && !task.completed;
          
          const updatedTasks = state.tasks.map((t) =>
            t.id === id
              ? { ...t, completed: !t.completed }
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
          console.log("ADD TASK", input);
          console.log("STORE STATE", state.tasks);
          
          const newTask: Task = {
            id: crypto.randomUUID(),
            completed: false,
            date: input.date ?? getToday(),
            ...input,
          };

          // Track activity
          useActivityStore.getState().addEvent(
            createActivityEvent("task_created", `Created task: ${input.label}`)
          );

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

        return {
          ...s,
          tasks: (s.tasks ?? []).map((t: any) => ({
            id: t.id,
            label: t.label,
            date: t.date,
            completed: t.completedDates?.includes(getToday()) ?? t.completed ?? false,
            time: t.time,
            category: t.category,
            notes: t.notes,
            recurrence: t.recurrence,
          })),
        } as TasksState;
      },
    }
  )
);
