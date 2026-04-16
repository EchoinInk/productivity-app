import { create } from "zustand";

export interface Task {
  id: number;
  label: string;
  done: boolean;
}

interface AppState {
  tasks: Task[];
  toggleTask: (id: number) => void;
  addTask: (label: string) => void;
}

export const useAppStore = create<AppState>()((set, get) => ({
  tasks: [
    { id: 1, label: "Review weekly goals", done: false },
    { id: 2, label: "Buy groceries", done: true },
  ],

  toggleTask: (id) => {
    set({
      tasks: get().tasks.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    });
  },

  addTask: (label) => {
    const newTask: Task = {
      id: Date.now(),
      label,
      done: false,
    };
    set({
      tasks: [newTask, ...get().tasks],
    });
  },
}))
