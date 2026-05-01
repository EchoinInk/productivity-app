import { useMemo } from "react";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { useMealsStore } from "@/features/meals/store/useMealsStore";
import { getToday } from "@/shared/lib/date";
import { TodayHeroView, type TodayHeroViewModel } from "./TodayHero.view";

interface TodayHeroContainerProps {
  onAddTask?: () => void;
}

export const TodayHeroContainer = ({ onAddTask }: TodayHeroContainerProps) => {
  const tasks = useTasksStore((state) => state.tasks);
  const weeklyBudget = useBudgetStore((state) => state.weeklyBudget);
  const expenses = useBudgetStore((state) => state.expenses);
  const meals = useMealsStore((state) => state.meals);

  const todayDate = getToday();

  const viewModel = useMemo((): TodayHeroViewModel => {
    // Get today's tasks
    const todayTasks = tasks.filter((task) => task.date === todayDate);
    const completedTasks = todayTasks.filter((task) => 
      task.completedDates.includes(todayDate)
    );
    
    // Calculate task progress
    const totalTasks = todayTasks.length;
    const completedCount = completedTasks.length;
    const remainingTasks = totalTasks - completedCount;
    const taskPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

    // Calculate budget remaining (weekly to daily)
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remainingBudget = weeklyBudget - totalExpenses;
    const dailyBudget = weeklyBudget / 7;
    const budgetPercentage = Math.round(Math.max(0, Math.min(100, (remainingBudget / weeklyBudget) * 100)));

    // Calculate meals logged today
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayWeekday = weekdays[new Date().getDay()];
    const todayMeals = meals.filter((meal) => meal.day === todayWeekday);
    const mealsLogged = todayMeals.length;
    const targetMeals = 3; // Breakfast, lunch, dinner
    const mealsPercentage = Math.round(Math.min(100, (mealsLogged / targetMeals) * 100));

    // Determine focus metric based on priority
    let focusMetric: {
      percentage: number;
      total: number;
      remaining: number;
      progressText: string;
      motivation: string | null;
      status: "on track" | "behind" | "ahead";
    };

    // Priority 1: Incomplete tasks
    if (totalTasks > 0) {
      focusMetric = {
        percentage: taskPercentage,
        total: totalTasks,
        remaining: remainingTasks,
        progressText: `${completedCount} of ${totalTasks} tasks completed`,
        motivation: taskPercentage >= 75 ? "You're doing great!" : 
                   taskPercentage >= 50 ? "Keep going!" : 
                   "Let's get started!",
        status: taskPercentage >= 75 ? "on track" : taskPercentage >= 50 ? "behind" : "behind"
      };
    }
    // Priority 2: Budget remaining
    else if (remainingBudget > 0) {
      focusMetric = {
        percentage: budgetPercentage,
        total: Math.round(weeklyBudget),
        remaining: Math.round(remainingBudget),
        progressText: `$${Math.round(remainingBudget)} of $${weeklyBudget} remaining`,
        motivation: budgetPercentage >= 50 ? "Budget on track!" : "Watch your spending",
        status: budgetPercentage >= 50 ? "on track" : "behind"
      };
    }
    // Priority 3: Meals logged
    else {
      focusMetric = {
        percentage: mealsPercentage,
        total: targetMeals,
        remaining: targetMeals - mealsLogged,
        progressText: `${mealsLogged} of ${targetMeals} meals logged`,
        motivation: mealsLogged === 0 ? "Time to plan your meals!" :
                   mealsLogged < targetMeals ? "Don't forget your meals!" : "All meals logged!",
        status: mealsPercentage >= 66 ? "on track" : "behind"
      };
    }

    return {
      ...focusMetric,
      onAddTask,
      isLoading: false
    };
  }, [tasks, weeklyBudget, expenses, meals, todayDate, onAddTask]);

  return <TodayHeroView model={viewModel} />;
};
