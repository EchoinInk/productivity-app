import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createId } from "@/shared/lib/id";
import { getToday } from "@/shared/lib/date";
import { createNamespacedStorage, STORE_VERSION } from "@/store/sharedPersist";
import type { CreateTaskInput, EntityId, Task } from "@/features/tasks/types";

interface TasksState {
  tasks: Task[];
  toggleTask: (id: EntityId, date: string) => void;
  addTask: (input: CreateTaskInput) => void;
  updateTask: (updated: Task) => void;
  deleteTask: (id: EntityId) => void;
}

export const useTasksStore = create<TasksState>()(
  persist(
    (set, get) => ({
      tasks: [],
      toggleTask: (id, date) => {
        set({
          tasks: get().tasks.map((task) => {
            if (task.id !== id) return task;
            const exists = task.completedDates.includes(date);
            return {
              ...task,
              completedDates: exists
                ? task.completedDates.filter((item) => item !== date)
                : [...task.completedDates, date],
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
      updateTask: (updated) =>
        set((state) => ({ tasks: state.tasks.map((task) => (task.id === updated.id ? updated : task)) })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
    }),
    {
      name: "tasks",
      version: STORE_VERSION,
      storage: createNamespacedStorage<Pick<TasksState, "tasks">>(["tasks"]),
      partialize: (state) => ({ tasks: state.tasks }),
      migrate: (persisted) => {
        const s = (persisted as Partial<TasksState>) ?? {};
        return {
          ...s,
          tasks: (s.tasks ?? []).map((t) => ({ ...t, completedDates: t.completedDates ?? [] })),
        } as TasksState;
      },
    },
  ),
);
