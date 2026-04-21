import { safePercent } from "@/shared/lib/number";
import type { Expense } from "@/features/budget/types";

export const getBudgetSummary = (expenses: Expense[], weeklyBudget: number) => {
  const spent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = weeklyBudget - spent;

  return {
    spent,
    remaining,
    percentage: safePercent(spent, weeklyBudget),
  };
};
