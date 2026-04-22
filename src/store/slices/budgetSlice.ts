import type { StateCreator } from "zustand";
import { createId } from "@/shared/lib/id";
import type { CreateExpenseInput, Expense } from "@/features/budget/types";
import type { AppState } from "@/store/rootStore";

export interface BudgetSlice {
  weeklyBudget: number;
  expenses: Expense[];
  addExpense: (input: CreateExpenseInput) => void;
}

export const createBudgetSlice: StateCreator<AppState, [], [], BudgetSlice> = (set) => ({
  weeklyBudget: 500,
  expenses: [],
  addExpense: (input) => set((state) => ({ expenses: [{ id: createId(), ...input }, ...state.expenses] })),
});
