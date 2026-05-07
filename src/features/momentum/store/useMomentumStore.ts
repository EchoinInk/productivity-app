import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createNamespacedStorage, STORE_VERSION } from "@/store/sharedPersist";
import type { DailyScore, MomentumState } from "../types/types";
import { calculateDailyScore } from "../dailyScore";
import { calculateAllStreaks } from "../streakCalculator";
import { calculateWeeklyConsistency } from "../weeklyConsistency";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { useMealsStore } from "@/features/meals/store/useMealsStore";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { useShoppingStore } from "@/features/shopping/store/useShoppingStore";
import { getToday } from "@/shared/lib/date";

interface MomentumStore extends MomentumState {
  // Actions
  calculateTodayScore: () => void;
  recalculateAllScores: () => void;
  addDailyScore: (score: DailyScore) => void;
}

/**
 * Momentum Store
 * 
 * Stores and manages retention metrics:
 * - Daily scores
 * - Streaks
 * - Weekly consistency
 * - Trend summaries
 */
export const useMomentumStore = create<MomentumStore>()(
  persist(
    (set, get) => ({
      dailyScores: [],
      streaks: {
        tasks: { current: 0, longest: 0, lastCompletedDate: null, type: 'tasks' },
        meals: { current: 0, longest: 0, lastCompletedDate: null, type: 'meals' },
        budget: { current: 0, longest: 0, lastCompletedDate: null, type: 'budget' },
        shopping: { current: 0, longest: 0, lastCompletedDate: null, type: 'shopping' },
        overall: { current: 0, longest: 0, lastCompletedDate: null, type: 'overall' },
      },
      weeklyConsistency: [],
      lastCalculated: null,

      calculateTodayScore: () => {
        // Get current data from other stores directly
        const tasks = useTasksStore.getState().tasks;
        const meals = useMealsStore.getState().meals;
        const expenses = useBudgetStore.getState().expenses;
        const shoppingItems = useShoppingStore.getState().shoppingItems;
        const weeklyBudget = useBudgetStore.getState().weeklyBudget;

        const todayScore = calculateDailyScore(
          tasks,
          meals,
          expenses,
          shoppingItems,
          weeklyBudget,
          getToday()
        );

        set((state) => {
          const existingIndex = state.dailyScores.findIndex(s => s.date === todayScore.date);
          const updatedScores = [...state.dailyScores];
          
          if (existingIndex >= 0) {
            updatedScores[existingIndex] = todayScore;
          } else {
            updatedScores.push(todayScore);
          }

          const updatedStreaks = calculateAllStreaks(updatedScores);
          const updatedConsistency = calculateWeeklyConsistency(updatedScores);

          return {
            dailyScores: updatedScores,
            streaks: updatedStreaks,
            weeklyConsistency: [...state.weeklyConsistency, updatedConsistency],
            lastCalculated: getToday(),
          };
        });
      },

      recalculateAllScores: () => {
        // This would recalculate all historical scores
        // For now, just recalculate today
        get().calculateTodayScore();
      },

      addDailyScore: (score: DailyScore) => {
        set((state) => {
          const existingIndex = state.dailyScores.findIndex(s => s.date === score.date);
          const updatedScores = [...state.dailyScores];
          
          if (existingIndex >= 0) {
            updatedScores[existingIndex] = score;
          } else {
            updatedScores.push(score);
          }

          return {
            dailyScores: updatedScores,
          };
        });
      },
    }),
    {
      name: "momentum",
      version: STORE_VERSION,
      storage: createNamespacedStorage<MomentumState>([
        "dailyScores",
        "streaks",
        "weeklyConsistency",
        "lastCalculated",
      ]),
      partialize: (state) => ({
        dailyScores: state.dailyScores,
        streaks: state.streaks,
        weeklyConsistency: state.weeklyConsistency,
        lastCalculated: state.lastCalculated,
      }),
    },
  ),
);
