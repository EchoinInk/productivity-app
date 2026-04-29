import { useMemo } from "react";
import { useBudgetStore } from "../store/useBudgetStore";
import { safePercent } from "@/shared/lib/number";
import type { Expense } from "../types/types";

export interface BudgetSummary {
  spent: number;
  remaining: number;
  percentage: number;
}

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
  const expenses = useBudgetStore((state) => state.expenses);
  const income = useBudgetStore((state) => state.income);
  return useMemo(() => getBudgetSummary(expenses, income), [expenses, income]);
};

export const useBudget = () => {
  const weeklyBudget = useBudgetStore((state) => state.weeklyBudget);
  const income = useBudgetStore((state) => state.income);
  const expenses = useBudgetStore((state) => state.expenses);
  const addExpense = useBudgetStore((state) => state.addExpense);
  const setIncome = useBudgetStore((state) => state.setIncome);

  const summary = useMemo(() => getBudgetSummary(expenses, income), [expenses, income]);

  return {
    weeklyBudget,
    income,
    expenses,
    summary,
    actions: {
      addExpense,
      setIncome,
    },
  };
};
