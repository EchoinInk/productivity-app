/**
 * Budget Service Layer
 * Isolates data operations for future React Query integration.
 */

import type { Expense } from "../types";

export interface BudgetService {
  getExpenses(): Promise<Expense[]>;
  getIncome(): Promise<number>;
  addExpense(expense: Expense): Promise<void>;
  setIncome(income: number): Promise<void>;
}

// Placeholder implementation
export const budgetService: BudgetService = {
  async getExpenses() {
    return [];
  },
  async getIncome() {
    return 0;
  },
  async addExpense(expense: Expense) {
    // Simulate
  },
  async setIncome(income: number) {
    // Simulate
  },
};