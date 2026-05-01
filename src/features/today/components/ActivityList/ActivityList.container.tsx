import { useMemo } from "react";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { useMealsStore } from "@/features/meals/store/useMealsStore";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { useShoppingStore } from "@/features/shopping/store/useShoppingStore";
import { getToday } from "@/shared/lib/date";
import { ActivityListView, type ActivityListViewModel, type ActivityItem } from "./ActivityList.view";

export const ActivityListContainer = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const meals = useMealsStore((state) => state.meals);
  const expenses = useBudgetStore((state) => state.expenses);
  const shoppingItems = useShoppingStore((state) => state.shoppingItems);

  const todayDate = getToday();

  const viewModel = useMemo((): ActivityListViewModel => {
    const activities: ActivityItem[] = [];

    // Get completed tasks from today
    const todayTasks = tasks.filter((task) => task.date === todayDate);
    todayTasks.forEach((task) => {
      const completedToday = task.completedDates.includes(todayDate);
      if (completedToday) {
        activities.push({
          id: `task-${task.id}`,
          type: "task_completed",
          title: `Completed: ${task.label}`,
          subtitle: task.category || "Task",
          timestamp: "Today",
        });
      }
    });

    // Get recent meals (today's meals)
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayWeekday = weekdays[new Date().getDay()];
    const todayMeals = meals.filter((meal) => meal.day === todayWeekday);
    
    todayMeals.forEach((meal) => {
      activities.push({
        id: `meal-${meal.id}`,
        type: "meal_logged",
        title: `Logged: ${meal.name}`,
        subtitle: todayWeekday,
        timestamp: "Today",
      });
    });

    // Get recent expenses (last 3)
    const recentExpenses = expenses.slice(0, 3);
    recentExpenses.forEach((expense) => {
      activities.push({
        id: `expense-${expense.id}`,
        type: "expense_added",
        title: `Added expense: ${expense.name}`,
        subtitle: `$${expense.amount}`,
        timestamp: "Today",
      });
    });

    // Get completed shopping items
    const completedShopping = shoppingItems.filter((item) => item.done);
    completedShopping.slice(0, 2).forEach((item) => {
      activities.push({
        id: `shopping-${item.id}`,
        type: "task_completed", // Reuse task_completed type for shopping
        title: `Purchased: ${item.name}`,
        subtitle: item.category || "Shopping",
        timestamp: "Today",
      });
    });

    // Sort by most recent first and limit to 5 items
    const sortedActivities = activities
      .sort((a, b) => {
        // For now, all activities are "Today", so we'll keep original order
        // In a real app, you'd sort by actual timestamps
        return 0;
      })
      .slice(0, 5);

    return {
      activities: sortedActivities,
      hasActivities: sortedActivities.length > 0,
    };
  }, [tasks, meals, expenses, shoppingItems, todayDate]);

  return <ActivityListView model={viewModel} />;
};
