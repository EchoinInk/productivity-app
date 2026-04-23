import { create } from "zustand"
import { nanoid } from "nanoid"

import type {
  TasksState,
  CreateTaskInput,
  EntityId,
  Task,
} from "@/features/tasks/types"
import type { DateKey } from "@/shared/lib/date"

export const useTasksStore = create<TasksState>((set) => ({
  tasks: [],

  /**
   * ADD TASK
   */
  addTask: (input: CreateTaskInput) =>
    set((state) => {
      const newTask: Task = {
        id: nanoid(),

        label: input.label,
        date: input.date,

        time: input.time,
        category: input.category,
        recurrence: input.recurrence,
        notes: input.notes,

        completedDates: [],
        createdAt: new Date().toISOString(),
      }

      return {
        tasks: [newTask, ...state.tasks],
      }
    }),

  /**
   * TOGGLE TASK (per date)
   */
  toggleTask: (id: EntityId, date: DateKey) =>
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id !== id) return task

        const exists = task.completedDates.includes(date)

        return {
          ...task,
          completedDates: exists
            ? task.completedDates.filter((d) => d !== date)
            : [...task.completedDates, date],
        }
      }),
    })),

  /**
   * UPDATE TASK (required)
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
}))