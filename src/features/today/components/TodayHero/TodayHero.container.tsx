import { TodayHeroView, type TodayHeroViewModel } from "./TodayHero.view";
import { useTodayData } from "@/features/today/hooks/useTodayData";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { useStreaksStore } from "@/features/insights/useStreaksStore";
import { getSmartMotivation, getSmartSubtext, type SmartMessagingData } from "@/features/insights/smartMessaging.utils";
import { useMemo, useCallback } from "react";

interface TodayHeroContainerProps {
  onAddTask?: () => void;
}

export const TodayHeroContainer = ({ onAddTask }: TodayHeroContainerProps) => {
  const today = useTodayData();
  const weeklyBudget = useBudgetStore((state) => state.weeklyBudget);
  const streaks = useStreaksStore((state) => state.streaks);

  // Memoize onAddTask to prevent infinite re-renders
  const stableOnAddTask = useCallback(() => onAddTask?.(), [onAddTask]);

  const viewModel = useMemo(() => {
    const remaining = today.summary.tasks.total - today.summary.tasks.completed;
    
    const smartData: SmartMessagingData = {
      tasksCompleted: today.summary.tasks.completed,
      tasksTotal: today.summary.tasks.total,
      remaining,
      streakTasks: streaks.tasks,
      streakMeals: streaks.meals,
      budgetRemaining: today.summary.budget.remaining,
      budgetTotal: weeklyBudget,
      mealsLogged: today.summary.meals.logged,
      mealsTarget: today.summary.meals.target,
    };

    const smartMotivation = getSmartMotivation(smartData);
    const smartSubtext = getSmartSubtext(smartData);

    return {
      percentage: today.focus.percentage,
      total: today.summary.tasks.total,
      remaining,
      progressText: smartSubtext,
      motivation: smartMotivation,
      status: today.focus.percentage >= 75 ? "on track" : today.focus.percentage >= 50 ? "behind" : "behind",
      onAddTask: stableOnAddTask,
      isLoading: false,
    } as TodayHeroViewModel;
  }, [today, weeklyBudget, streaks, stableOnAddTask]);

  return <TodayHeroView model={viewModel} />;
};
