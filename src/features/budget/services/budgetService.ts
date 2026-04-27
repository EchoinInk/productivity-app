/**
 * Budget Service Layer
 *
 * Pure data-access boundary. Currently a typed placeholder; will be
 * swapped for HTTP/edge-function calls without changing consumer code.
 */

import type { CreateExpenseInput, Expense } from "../types";

export interface BudgetService {
  getExpenses(): Promise<Expense[]>;
  getIncome(): Promise<number>;
  addExpense(input: CreateExpenseInput): Promise<Expense>;
  setIncome(income: number): Promise<void>;
}

export const budgetService: BudgetService = {
  async getExpenses(): Promise<Expense[]> {
    return [];
  },
  async getIncome(): Promise<number> {
    return 0;
  },
  async addExpense(_input: CreateExpenseInput): Promise<Expense> {
    throw new Error("budgetService.addExpense not implemented");
  },
  async setIncome(_income: number): Promise<void> {
    return;
  },
};
