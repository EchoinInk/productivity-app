import { create } from "zustand";

export type TaskCategory = "Today" | "Upcoming" | "Weekly" | "Monthly";

export interface Task {
  id: number;
  label: string;
  done: boolean;
  category: TaskCategory;
}

interface AppState {
  tasks: Task[];
  toggleTask: (id: number) => void;
  addTask: (label: string, category?: TaskCategory) => void;
}

export const useAppStore = create<AppState>()((set, get) => ({
  tasks: [
    { id: 1, label: "Review weekly goals", done: false, category: "Weekly" },
    { id: 2, label: "Buy groceries", done: true, category: "Today" },
  ],

  toggleTask: (id) => {
    set({
      tasks: get().tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    });
  },

  addTask: (task) =>
  set((state) => ({
    tasks: [task, ...state.tasks],
  })),
    set({
      tasks: [newTask, ...get().tasks],
    });
  },
}))
