import { useMemo, useEffect } from "react";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { useMealsStore } from "@/features/meals/store/useMealsStore";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { useShoppingStore } from "@/features/shopping/store/useShoppingStore";
import { useActivityStore } from "@/features/activity/useActivityStore";
import { useStreaksStore } from "@/features/insights/useStreaksStore";
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
  const events = useActivityStore((state) => state.events);
  const updateStreak = useStreaksStore((state) => state.updateStreak);

  console.log("TODAY DATA DEBUG", { tasks: tasks.length, meals: meals.length, events: events.length });

  const todayDate = getToday();

  // Lightweight computations for initial render
  const todayTasks = useMemo(() => 
    tasks.filter((task) => task.date === todayDate), 
    [tasks, todayDate]
  );
  
  const completedTasks = useMemo(() => 
    todayTasks.filter((task) => task.completed), 
    [todayTasks, todayDate]
  );
  
  const todayWeekday = useMemo(() => {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekdays[new Date().getDay()];
  }, []);
  
  const todayMeals = useMemo(() => 
    meals.filter((meal) => meal.day === todayWeekday), 
    [meals, todayWeekday]
  );
  
  const totalExpenses = useMemo(() => 
    expenses.reduce((sum, expense) => sum + expense.amount, 0), 
    [expenses]
  );
  
  const remainingBudget = useMemo(() => 
    weeklyBudget - totalExpenses, 
    [weeklyBudget, totalExpenses]
  );
  
  const incompleteShoppingItems = useMemo(() => 
    shoppingItems.filter((item) => !item.done), 
    [shoppingItems]
  );

  // Update streaks based on today's completion
  useEffect(() => {
    // Update task streak if all tasks completed
    if (todayTasks.length > 0 && completedTasks.length === todayTasks.length) {
      updateStreak("tasks", true);
    } else if (todayTasks.length > 0 && completedTasks.length === 0) {
      updateStreak("tasks", false);
    }
    
    // Update meal streak if all meals logged (target is 3)
    if (todayMeals.length >= 3) {
      updateStreak("meals", true);
    } else if (todayMeals.length === 0) {
      updateStreak("meals", false);
    }
  }, [todayTasks, completedTasks, todayMeals, updateStreak]);

  return useMemo((): TodayData => {

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
        // motivation will be handled by smart messaging in TodayHero
      };
    }
    // Priority 2: Budget
    else if (remainingBudget > 0) {
      const budgetPercentage = Math.round((remainingBudget / weeklyBudget) * 100);
      
      focus = {
        percentage: budgetPercentage,
        label: `$${Math.round(remainingBudget)} remaining`,
        subtext: `of $${weeklyBudget} weekly budget`,
        // motivation will be handled by smart messaging in TodayHero
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
        // motivation will be handled by smart messaging in TodayHero
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
    console.log("UP NEXT DEBUG", { 
      todayTasks: todayTasks.length, 
      completedTasks: completedTasks.length,
      nextTask: todayTasks.find(t => !t.completed),
      mealsLogged: todayMeals.length 
    });

    const upNext: TodayData["upNext"] = [
      // Today's tasks, sorted by time if available
      ...todayTasks
        .filter(task => !task.completed)
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
      
      // Next meal (simplified - just show today's meals if not All logged)
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
    // Get real activity events from the activity store
    const activity: TodayData["activity"] = events
      .filter(event => 
        event.type === "task_completed" || 
        event.type === "expense_added" || 
        event.type === "meal_logged"
      )
      .slice(0, 5)
      .map(event => ({
        id: event.id,
        type: event.type as "task_completed" | "expense_added" | "meal_logged",
        label: event.label,
        timestamp: event.timestamp,
      }));

    return {
      focus,
      summary,
      upNext,
      activity,
    };
  }, [todayTasks, completedTasks, todayMeals, remainingBudget, incompleteShoppingItems, todayWeekday, expenses, todayDate, weeklyBudget, events]);
};
