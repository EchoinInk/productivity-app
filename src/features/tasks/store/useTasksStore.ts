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

// Selectors
export const selectTodayTasks = (state: TasksState): Task[] => {
  const today = getToday() || new Date().toISOString().split("T")[0]!;
  return state.tasks.filter(task => task.date === today && !task.completed);
};

export const selectCompletedTasks = (state: TasksState): Task[] => {
  return state.tasks.filter(task => task.completed);
};

export const selectUpcomingTasks = (state: TasksState): Task[] => {
  const today = getToday() || new Date().toISOString().split("T")[0]!;
  return state.tasks.filter(task => task.date > today);
};

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
          const newTask: Task = {
            id: crypto.randomUUID(),
            completed: false,
            date: input.date ?? getToday() ?? new Date().toISOString().split("T")[0]!,
            ...input,
          };


          // Track activity
          useActivityStore.getState().addEvent(
            createActivityEvent("task_created", `Created task: ${input.label}`)
          );
          console.log("ADDING TASK", newTask);

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
              // Old format: Task had completedDates array
              return {
                ...task,
                completed: (task as any).completedDates.includes(todayDate),
                completedDates: undefined, // Remove old field
              };
            }
            return task;
          }),
        } as TasksState;
      },
    }
  )
);
