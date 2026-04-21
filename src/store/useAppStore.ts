import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getToday } from "@/lib/date";

export interface Task {
  id: number;
  label: string;
  date: string;
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
  notes?: string;
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
    recurrence?: "none" | "weekly" | "monthly",
    category?: Task["category"],
    notes?: string,
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

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      weeklyBudget: 500,

      tasks: [],
      expenses: [],
      meals: [],
      shoppingItems: [],
      bills: [],
      recipes: [],

      // ✅ TOGGLE TASK
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

      // ✅ ADD TASK
      addTask: (label, date, time, recurrence = "none", category, notes) =>
        set((state) => ({
          tasks: [
            {
              id: Date.now(),
              label,
              date: date || getToday(),
              time,
              recurrence,
              category,
              notes,
              completedDates: [],
            },
            ...state.tasks,
          ],
        })),

      // ✅ UPDATE TASK
      updateTask: (updated) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === updated.id ? updated : t)),
        })),

      // ✅ DELETE TASK
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      // ✅ EXPENSES
      addExpense: (name, amount) =>
        set((state) => ({
          expenses: [{ id: Date.now(), name, amount }, ...state.expenses],
        })),

      // ✅ MEALS
      addMeal: (name, day) =>
        set((state) => ({
          meals: [{ id: Date.now(), name, day }, ...state.meals],
        })),

      // ✅ SHOPPING
      addShoppingItem: (name) =>
        set((state) => ({
          shoppingItems: [{ id: Date.now(), name, done: false }, ...state.shoppingItems],
        })),

      toggleShoppingItem: (id) =>
        set((state) => ({
          shoppingItems: state.shoppingItems.map((i) => (i.id === id ? { ...i, done: !i.done } : i)),
        })),

      // ✅ BILLS
      addBill: (name, amount, date) =>
        set((state) => ({
          bills: [{ id: Date.now(), name, amount, date }, ...state.bills],
        })),

      // ✅ RECIPES
      addRecipe: (recipe) =>
        set((state) => ({
          recipes: [{ id: Date.now(), ...recipe }, ...state.recipes],
        })),
    }),
    {
      name: "app-storage", // 🔑 persistence key
    },
  ),
);
