import { useMemo } from "react";
import { safePercent } from "@/shared/lib/number";
import type { Expense } from "@/features/budget/types";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";

export interface BudgetSummary {
  spent: number;
  remaining: number;
  percentage: number;
}

export const selectExpenses = (state: { expenses: Expense[] }) =>
  state.expenses;

export const selectIncome = (state: { income: number }) => state.income;

/** Action selectors — keep references stable across renders. */
export const selectAddExpense = (s: { expenses: Expense[]; addExpense: (input: any) => void }) => s.addExpense;
export const selectSetIncome = (s: { income: number; setIncome: (amount: number) => void }) => s.setIncome;

export const getBudgetSummary = (
  expenses: Expense[],
  weeklyBudget: number,
): BudgetSummary => {
  const spent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  return {
    spent,
    remaining: weeklyBudget - spent,
    percentage: safePercent(spent, weeklyBudget),
  };
};

export const useBudgetSummary = (): BudgetSummary => {
  const expenses = useBudgetStore(selectExpenses);
  const income = useBudgetStore(selectIncome);
  return useMemo(() => getBudgetSummary(expenses, income), [expenses, income]);
};
