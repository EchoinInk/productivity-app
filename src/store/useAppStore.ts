import { create } from "zustand";
import { getToday } from "@/lib/date";

export interface Task {
  id: number;
  label: string;
  date: string;
  priority?: "Low" | "Medium" | "High";
  category?:
    | "Home & Household"
    | "Health & Wellness"
    | "Career Development"
    | "Errands & Life Admin"
    | "Family & Relationships"
    | "Finances";

  recurrence?: "none" | "weekly" | "monthly";
  completedDates: string[];
  time?: string;

  notes?: string; // ✅ ADD THIS
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

  toggleTask: (id: number, date: string) => void;

  addTask: (
    label: string,
    date: string,
    time?: string,
    priority?: "Low" | "Medium" | "High",
    recurrence?: "none" | "weekly" | "monthly",
    category?: Task["category"],
    notes?: string, // ✅ ADD
  ) => void;

  updateTask: (updated: Task) => void;

  deleteTask: (id: number) => void;

  addExpense: (name: string, amount: number) => void;
  addMeal: (name: string, day: string) => void;
  addShoppingItem: (name: string) => void;
  toggleShoppingItem: (id: number) => void;
  addBill: (name: string, amount: number, date: string) => void;
  addRecipe: (recipe: { name: string; ingredients: string[]; category?: string }) => void;
}

export const useAppStore = create<AppState>()((set, get) => ({
  weeklyBudget: 500,

  tasks: [],
  expenses: [],
  meals: [],
  shoppingItems: [],
  bills: [],
  recipes: [],

  // ✅ CLEAN TOGGLE (NO OPTIONAL CHECK NEEDED)
  toggleTask: (id, date) => {
    set({
      tasks: get().tasks.map((t) => {
        if (t.id !== id) return t;

        const exists = t.completedDates.includes(date);

        return {
          ...t,
          completedDates: exists ? t.completedDates.filter((d) => d !== date) : [...t.completedDates, date],
        };
      }),
    });
  },

  // ✅ ADD TASK WITH SAFE DATE
  addTask: (label, date, time, priority, recurrence = "none", category, notes) =>
    set((state) => {
      const newTask: Task = {
        id: Date.now(),
        label,
        date: date || getToday(),
        time,
        priority: priority ?? "Medium",
        recurrence,
        category,
        notes, // ✅ ADD THIS
        completedDates: [],
      };

      return {
        tasks: [newTask, ...state.tasks],
      };
    }),

  updateTask: (updated) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === updated.id ? updated : t)),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
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
      shoppingItems: state.shoppingItems.map((i) => (i.id === id ? { ...i, done: !i.done } : i)),
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
