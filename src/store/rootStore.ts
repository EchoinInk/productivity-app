import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createBillsSlice, type BillsSlice } from "@/store/slices/billsSlice";
import { createBudgetSlice, type BudgetSlice } from "@/store/slices/budgetSlice";
import { createMealsSlice, type MealsSlice } from "@/store/slices/mealsSlice";
import { createRecipesSlice, type RecipesSlice } from "@/store/slices/recipesSlice";
import { createShoppingSlice, type ShoppingSlice } from "@/store/slices/shoppingSlice";
import { createTasksSlice, type TasksSlice } from "@/store/slices/tasksSlice";
import { migrateStore, partializeStore, STORE_VERSION } from "@/store/persistence";

export type AppState = TasksSlice & BudgetSlice & MealsSlice & ShoppingSlice & BillsSlice & RecipesSlice;

export const useAppStore = create<AppState>()(
  persist(
    (...args) => ({
      ...createTasksSlice(...args),
      ...createBudgetSlice(...args),
      ...createMealsSlice(...args),
      ...createShoppingSlice(...args),
      ...createBillsSlice(...args),
      ...createRecipesSlice(...args),
    }),
    {
      name: "app-storage",
      version: STORE_VERSION,
      migrate: migrateStore,
      partialize: partializeStore,
    },
  ),
);
