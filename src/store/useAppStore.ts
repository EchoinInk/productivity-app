import { create } from "zustand";

export type TaskCategory = "Today" | "Upcoming" | "Weekly" | "Monthly";

export interface Task {
  id: number;
  label: string;
  done: boolean;
  category: TaskCategory;
  date?: string;
  time?: string;
  type?: string;
}

export interface Expense {
  id: number;
  name: string;
  amount: number;
}

export interface Meal {
  id: number;
  name: string;
  day: string;
}

export interface ShoppingItem {
  id: number;
  name: string;
  done: boolean;
}

export interface Bill {
  id: number;
  name: string;
  amount: number;
  date: string;
}

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  category?: string;
}

interface AppState {
  weeklyBudget: number;

  tasks: Task[];
  expenses: Expense[];
  meals: Meal[];
  shoppingItems: ShoppingItem[];
  bills: Bill[];
  recipes: Recipe[];

  toggleTask: (id: number) => void;
  addTask: (
    label: string,
    category?: TaskCategory,
    date?: string,
    time?: string,
    type?: string,
  ) => void;

  addExpense: (name: string, amount: number) => void;
  addMeal: (name: string, day: string) => void;
  addShoppingItem: (name: string) => void;
  toggleShoppingItem: (id: number) => void;
  addBill: (name: string, amount: number, date: string) => void;
  addRecipe: (recipe: { name: string; ingredients: string[]; category?: string }) => void;
}

export const useAppStore = create<AppState>()((set, get) => ({
  weeklyBudget: 500,

  tasks: [
    { id: 1, label: "Review weekly goals", done: false, category: "Weekly" },
    { id: 2, label: "Buy groceries", done: true, category: "Today" },
  ],
  expenses: [],
  meals: [],
  shoppingItems: [],
  bills: [],
  recipes: [],

  toggleTask: (id) => {
    set({
      tasks: get().tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    });
  },

  addTask: (label, category = "Today", date, time, type) =>
    set((state) => ({
      tasks: [
        { id: Date.now(), label, done: false, category, date, time, type },
        ...state.tasks,
      ],
    })),

  addExpense: (name, amount) =>
    set((state) => ({
      expenses: [{ id: Date.now(), name, amount }, ...state.expenses],
    })),

  addMeal: (name, day) =>
    set((state) => ({
      meals: [{ id: Date.now(), name, day }, ...state.meals],
    })),

  addShoppingItem: (name) =>
    set((state) => ({
      shoppingItems: [{ id: Date.now(), name, done: false }, ...state.shoppingItems],
    })),

  toggleShoppingItem: (id) =>
    set((state) => ({
      shoppingItems: state.shoppingItems.map((i) =>
        i.id === id ? { ...i, done: !i.done } : i,
      ),
    })),

  addBill: (name, amount, date) =>
    set((state) => ({
      bills: [{ id: Date.now(), name, amount, date }, ...state.bills],
    })),

  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [{ id: Date.now(), ...recipe }, ...state.recipes],
    })),
}));
