import { create } from "zustand";
import { persist } from "zustand/middleware";

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

  addTask: (task: Task) => void;
  toggleTask: (id: number) => void;

  addTransaction: (transaction: Transaction) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      tasks: [
        { id: 1, label: "Review weekly goals", done: false, category: "Today" },
        { id: 2, label: "Buy groceries", done: true, category: "Today" },
      ],

      transactions: [
        { id: 1, label: "Groceries", amount: -52.3 },
        { id: 2, label: "Freelance payment", amount: 200 },
      ],

      addTask: (task) =>
        set((state) => ({
          tasks: [task, ...state.tasks],
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          ),
        })),

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),
    }),
    {
      name: "life-os-storage",
    }
  )
);
