import type { StateCreator } from "zustand";
import { createId } from "@/shared/lib/id";
import type { CreateExpenseInput, Expense } from "@/features/budget/types";
import type { AppState } from "@/store/rootStore";

export interface BudgetSlice {
  weeklyBudget: number; // your planned budget
  income: number; // NEW: actual income
  expenses: Expense[];
  addExpense: (input: CreateExpenseInput) => void;
  setIncome: (amount: number) => void; // NEW
}

export const createBudgetSlice: StateCreator<AppState, [], [], BudgetSlice> = (set) => ({
  weeklyBudget: 500,
  income: 0, // NEW
  expenses: [],

  addExpense: (input) =>
    set((state) => ({
      expenses: [{ id: createId(), ...input }, ...state.expenses],
    })),

  setIncome: (amount) =>
    set(() => ({
      income: amount,
    })),
});
