import type { StateCreator } from "zustand";
import { createId } from "@/shared/lib/id";
import { getToday } from "@/shared/lib/date";
import type { CreateTaskInput, EntityId, Task } from "@/features/tasks/types";
import type { AppState } from "@/store/rootStore";

export interface TasksSlice {
  tasks: Task[];
  toggleTask: (id: EntityId, date: string) => void;
  addTask: (input: CreateTaskInput) => void;
  updateTask: (updated: Task) => void;
  deleteTask: (id: EntityId) => void;
}

export const createTasksSlice: StateCreator<AppState, [], [], TasksSlice> = (set, get) => ({
  tasks: [],
  toggleTask: (id, date) => {
    set({
      tasks: get().tasks.map((task) => {
        if (task.id !== id) return task;
        const exists = task.completedDates.includes(date);
        return {
          ...task,
          completedDates: exists ? task.completedDates.filter((item) => item !== date) : [...task.completedDates, date],
        };
      }),
    });
  },
  addTask: (input) =>
    set((state) => ({
      tasks: [
        {
          id: createId(),
          label: input.label,
          date: input.date || getToday(),
          time: input.time,
          recurrence: input.recurrence ?? "none",
          category: input.category,
          notes: input.notes,
          completedDates: [],
        },
        ...state.tasks,
      ],
    })),
  updateTask: (updated) => set((state) => ({ tasks: state.tasks.map((task) => (task.id === updated.id ? updated : task)) })),
  deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
});
