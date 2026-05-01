import { InsightsCardView, type InsightsCardViewModel } from "./InsightsCard.view";
import { useTodayData } from "@/features/today/hooks/useTodayData";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { useStreaksStore } from "@/features/insights/useStreaksStore";
import { generateInsights, getTopInsights, type InsightData } from "@/features/insights/insights.utils";
import { useMemo } from "react";

export const InsightsCardContainer = () => {
  const today = useTodayData();
  const weeklyBudget = useBudgetStore((state) => state.weeklyBudget);
  const streaks = useStreaksStore((state) => state.streaks);

  const viewModel = useMemo(() => {
    const insightData: InsightData = {
      tasksCompleted: today.summary.tasks.completed,
      tasksTotal: today.summary.tasks.total,
      expenses: [], // Would need expense data with dates for accurate insights
      mealsLogged: today.summary.meals.logged,
      mealsTarget: today.summary.meals.target,
      budgetRemaining: today.summary.budget.remaining,
      budgetTotal: weeklyBudget,
      shoppingCompleted: 0, // Would need shopping completion data
      shoppingTotal: 0,
      streakTasks: streaks.tasks.current,
      streakMeals: streaks.meals.current,
    };

    const allInsights = generateInsights(insightData);
    const topInsights = getTopInsights(allInsights, 2);

    return {
      insights: topInsights,
    } as InsightsCardViewModel;
  }, [today, weeklyBudget, streaks]);

  return <InsightsCardView model={viewModel} />;
};
