/**
 * `useBudgetData` — single, future-proof entry point for budget data.
 *
 * Today this reads from the Zustand store via `useBudgetSummary`.
 * When the data layer moves to React Query + `budgetService`, only
 * this hook needs to change.
 */

import { useCallback } from "react";

import {
  useBudgetSummary,
  type BudgetSummary,
} from "@/features/budget/selectors/budgetSelectors";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import type { CreateExpenseInput } from "@/features/budget/types";

export interface UseBudgetDataResult {
  summary: BudgetSummary;
  isLoading: boolean;
  error: Error | null;
  addExpense: (input: CreateExpenseInput) => void;
  setIncome: (amount: number) => void;
}

export const useBudgetData = (): UseBudgetDataResult => {
  const summary = useBudgetSummary();
  const addExpenseAction = useBudgetStore((s) => s.addExpense);
  const setIncomeAction = useBudgetStore((s) => s.setIncome);

  const addExpense = useCallback(
    (input: CreateExpenseInput) => addExpenseAction(input),
    [addExpenseAction],
  );

  const setIncome = useCallback(
    (amount: number) => setIncomeAction(amount),
    [setIncomeAction],
  );

  return { summary, isLoading: false, error: null, addExpense, setIncome };
};
