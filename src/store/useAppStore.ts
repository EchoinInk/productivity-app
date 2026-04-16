import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Task {
  id: number;
  label: string;
  done: boolean;
  due?: string;
  category: string;
}

export interface Transaction {
  id: number;
  label: string;
  amount: number;
}

interface AppState {
  tasks: Task[];
  transactions: Transaction[];

  toggleTask: (id: number) => void;
  addTask: (task: Task) => void;
  addTransaction: (transaction: Transaction) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      tasks: [
        {
          id: 1,
          label: "Review weekly goals",
          done: false,
          category: "Today",
        },
      ],

      transactions: [],

      toggleTask: (id) => {
        set({
          tasks: get().tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          ),
        });
      },

      addTask: (task) => {
        set({
          tasks: [task, ...get().tasks],
        });
      },

      addTransaction: (transaction) => {
        set({
          transactions: [transaction, ...get().transactions],
        });
      },
    }),
    {
      name: "life-os-storage",

      // 🔥 THIS IS THE FIX
      storage: createJSONStorage(() => localStorage),
    }
  )
);
