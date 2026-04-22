import type { AppState } from "@/store/rootStore";

export const STORE_VERSION = 1;

export const migrateStore = (persistedState: unknown): AppState | unknown => {
  if (!persistedState || typeof persistedState !== "object") return persistedState;

  const state = persistedState as Partial<AppState>;

  return {
    ...state,
    tasks:
      state.tasks?.map((task) => ({
        ...task,
        completedDates: task.completedDates ?? [],
      })) ?? [],
  };
};

export const partializeStore = (state: AppState) => ({
  tasks: state.tasks,
  weeklyBudget: state.weeklyBudget,
  income: state.income,
  expenses: state.expenses,
  meals: state.meals,
  shoppingItems: state.shoppingItems,
  bills: state.bills,
  recipes: state.recipes,
});
