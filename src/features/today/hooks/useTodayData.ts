import { useTaskData } from "@/features/tasks/hooks/useTaskData";
import { useMealData } from "@/features/meals/hooks/useMealData";
import { useBudgetData } from "@/features/budget/hooks/useBudgetData";
import { useShoppingData } from "@/features/shopping/hooks/useShoppingData";

export type TodayData = {
  focus: {
    percentage: number;
    label: string;
    subtext: string;
  };
  summary: {
    tasks: { completed: number; total: number };
    meals: { logged: number; target: number };
    budget: { remaining: number };
    shopping: { remaining: number };
  };
};

export const useTodayData = (): TodayData => {
  // Use abstraction hooks for data
  const taskData = useTaskData();
  const mealData = useMealData();
  const budgetData = useBudgetData();
  const shoppingData = useShoppingData();

  const { todayTasks, completedTodayTasks } = taskData;
  const { weeklyBudget, remaining: remainingBudget } = budgetData.budgetSummary;
  const { incompleteCount } = shoppingData;
  const { todayMeals } = mealData;

  let focus: TodayData["focus"] = {
    percentage: 0,
    label: "No focus today",
    subtext: "Enjoy your day!",
  };

  if (todayTasks.length > 0) {
    const percentage = Math.round((completedTodayTasks.length / todayTasks.length) * 100);
    const remaining = todayTasks.length - completedTodayTasks.length;
    focus = {
      percentage,
      label: `${remaining} task${remaining !== 1 ? "s" : ""} remaining`,
      subtext: `${completedTodayTasks.length} of ${todayTasks.length} completed`,
    };
  } else if (remainingBudget > 0 && weeklyBudget > 0) {
    const percentage = Math.round((remainingBudget / weeklyBudget) * 100);
    focus = {
      percentage,
      label: `$${Math.round(remainingBudget)} remaining`,
      subtext: `of $${weeklyBudget} weekly budget`,
    };
  } else {
    const target = 3;
    const percentage = Math.round((todayMeals.length / target) * 100);
    const remaining = target - todayMeals.length;
    focus = {
      percentage,
      label: `${remaining} meal${remaining !== 1 ? "s" : ""} to log`,
      subtext: `${todayMeals.length} of ${target} logged`,
    };
  }

  return {
    focus,
    summary: {
      tasks: { completed: completedTodayTasks.length, total: todayTasks.length },
      meals: { logged: todayMeals.length, target: 3 },
      budget: { remaining: Math.round(remainingBudget) },
      shopping: { remaining: incompleteCount },
    },
  };
};
