import { useMemo } from "react";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { useMealsStore } from "@/features/meals/store/useMealsStore";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { useShoppingStore } from "@/features/shopping/store/useShoppingStore";
import { getToday } from "@/shared/lib/date";

export type TodayData = {
  focus: {
    percentage: number;
    label: string;
    subtext: string;
    motivation?: string;
  };
  summary: {
    tasks: { completed: number; total: number };
    meals: { logged: number; target: number };
    budget: { remaining: number };
    shopping: { remaining: number };
  };
  upNext: Array<{
    id: string;
    type: "task" | "meal" | "expense";
    title: string;
    time?: string;
  }>;
  activity: Array<{
    id: string;
    type: "task_completed" | "expense_added" | "meal_logged";
    label: string;
    timestamp: number;
  }>;
};

export const useTodayData = (): TodayData => {
  const tasks = useTasksStore((state) => state.tasks);
  const meals = useMealsStore((state) => state.meals);
  const weeklyBudget = useBudgetStore((state) => state.weeklyBudget);
  const expenses = useBudgetStore((state) => state.expenses);
  const shoppingItems = useShoppingStore((state) => state.shoppingItems);

  const todayDate = getToday();

  return useMemo((): TodayData => {
    // === TODAY'S DATA ===
    const todayTasks = tasks.filter((task) => task.date === todayDate);
    const completedTasks = todayTasks.filter((task) => 
      task.completedDates.includes(todayDate)
    );
    
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayWeekday = weekdays[new Date().getDay()];
    const todayMeals = meals.filter((meal) => meal.day === todayWeekday);
    
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remainingBudget = weeklyBudget - totalExpenses;
    const incompleteShoppingItems = shoppingItems.filter((item) => !item.done);

    // === FOCUS METRIC ===
    let focus: TodayData["focus"] = {
      percentage: 0,
      label: "No focus today",
      subtext: "Enjoy your day!",
    };

    // Priority 1: Tasks
    if (todayTasks.length > 0) {
      const taskPercentage = Math.round((completedTasks.length / todayTasks.length) * 100);
      const remainingTasks = todayTasks.length - completedTasks.length;
      
      focus = {
        percentage: taskPercentage,
        label: `${remainingTasks} task${remainingTasks !== 1 ? 's' : ''} remaining`,
        subtext: `${completedTasks.length} of ${todayTasks.length} completed`,
        motivation: taskPercentage >= 75 ? "You're doing great!" : 
                   taskPercentage >= 50 ? "Keep going!" : 
                   "Let's get started!",
      };
    }
    // Priority 2: Budget
    else if (remainingBudget > 0) {
      const budgetPercentage = Math.round((remainingBudget / weeklyBudget) * 100);
      
      focus = {
        percentage: budgetPercentage,
        label: `$${Math.round(remainingBudget)} remaining`,
        subtext: `of $${weeklyBudget} weekly budget`,
        motivation: budgetPercentage >= 50 ? "Budget on track!" : "Watch your spending",
      };
    }
    // Priority 3: Meals
    else {
      const targetMeals = 3;
      const mealsPercentage = Math.round((todayMeals.length / targetMeals) * 100);
      const remainingMeals = targetMeals - todayMeals.length;
      
      focus = {
        percentage: mealsPercentage,
        label: `${remainingMeals} meal${remainingMeals !== 1 ? 's' : ''} to log`,
        subtext: `${todayMeals.length} of ${targetMeals} logged`,
        motivation: todayMeals.length === 0 ? "Time to plan your meals!" :
                   todayMeals.length < targetMeals ? "Don't forget your meals!" : "All meals logged!",
      };
    }

    // === SUMMARY ===
    const summary: TodayData["summary"] = {
      tasks: {
        completed: completedTasks.length,
        total: todayTasks.length,
      },
      meals: {
        logged: todayMeals.length,
        target: 3,
      },
      budget: {
        remaining: Math.round(remainingBudget),
      },
      shopping: {
        remaining: incompleteShoppingItems.length,
      },
    };

    // // === UP NEXT ===
    const upNext: TodayData["upNext"] = [
      // Today's tasks, sorted by time if available
      ...todayTasks
        .filter(task => !task.completedDates.includes(todayDate))
        .sort((a, b) => {
          if (a.time && b.time) return a.time.localeCompare(b.time);
          if (a.time) return -1;
          if (b.time) return 1;
          return 0;
        })
        .slice(0, 3)
        .map(task => ({
          id: task.id,
          type: "task" as const,
          title: task.label,
          time: task.time,
        })),
      
      // Next meal (simplified - just show today's meals if not all logged)
      ...(todayMeals.length < 3 ? [{
        id: `meal-${todayWeekday}`,
        type: "meal" as const,
        title: "Log next meal",
      }] : []),
      
      // Recent expense
      ...expenses.slice(0, 1).map(expense => ({
        id: `expense-${expense.id}`,
        type: "expense" as const,
        title: `Track expense: ${expense.name}`,
      })),
    ].slice(0, 5);

    // === ACTIVITY ===
    // Since we don't have a real event system, derive from latest store updates
    const activity: TodayData["activity"] = [
      // Recent task completions
      ...completedTasks.slice(0, 2).map(task => ({
        id: `task-${task.id}`,
        type: "task_completed" as const,
        label: `Completed: ${task.label}`,
        timestamp: new Date(task.completedDates[task.completedDates.length - 1] || task.createdAt).getTime(),
      })),
      
      // Recent expenses
      ...expenses.slice(0, 2).map(expense => ({
        id: `expense-${expense.id}`,
        type: "expense_added" as const,
        label: `Added expense: ${expense.name}`,
        timestamp: Date.now() - Math.random() * 86400000, // Mock timestamp
      })),
      
      // Recent meals
      ...todayMeals.slice(0, 1).map(meal => ({
        id: `meal-${meal.id}`,
        type: "meal_logged" as const,
        label: `Logged meal: ${meal.name}`,
        timestamp: Date.now() - Math.random() * 86400000, // Mock timestamp
      })),
    ]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5);

    return {
      focus,
      summary,
      upNext,
      activity,
    };
  }, [tasks, meals, weeklyBudget, expenses, shoppingItems, todayDate]);
};
