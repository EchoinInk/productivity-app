import { useMemo } from "react";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { useMealsStore } from "@/features/meals/store/useMealsStore";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { getToday } from "@/shared/lib/date";
import { TodayUpNextView, type TodayUpNextViewModel, type UpNextItem } from "./TodayUpNext.view";

export const TodayUpNextContainer = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const toggleTask = useTasksStore((state) => state.toggleTask);
  const meals = useMealsStore((state) => state.meals);
  const expenses = useBudgetStore((state) => state.expenses);

  const todayDate = getToday();

  const viewModel = useMemo((): TodayUpNextViewModel => {
    // Get today's incomplete tasks
    const todayTasks = tasks.filter((task) => 
      task.date === todayDate && !task.completedDates.includes(todayDate)
    );

    // Get today's meals
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayWeekday = weekdays[new Date().getDay()];
    const todayMeals = meals.filter((meal) => meal.day === todayWeekday);

    // Get recent expenses (limit to most recent ones)
    const recentExpenses = expenses.slice(0, 3);

    // Convert tasks to UpNextItem format
    const taskItems: UpNextItem[] = todayTasks
      .sort((a, b) => {
        if (a.time && b.time) return a.time.localeCompare(b.time);
        if (a.time) return -1;
        if (b.time) return 1;
        return 0;
      })
      .slice(0, 3)
      .map((task) => ({
        id: task.id,
        type: "task" as const,
        title: task.label,
        time: task.time,
        completed: task.completedDates.includes(todayDate),
        onToggle: () => toggleTask(task.id, todayDate)
      }));

    // Convert meals to UpNextItem format
    const mealItems: UpNextItem[] = todayMeals
      .slice(0, 2)
      .map((meal, index) => ({
        id: `meal-${meal.id}`,
        type: "meal" as const,
        title: meal.name || `Meal ${index + 1}`,
        completed: false
      }));

    // Convert recent expenses to UpNextItem format
    const expenseItems: UpNextItem[] = recentExpenses
      .slice(0, 1)
      .map((expense) => ({
        id: `expense-${expense.id}`,
        type: "expense" as const,
        title: expense.name || `Expense $${expense.amount}`,
        completed: false
      }));

    // Combine and sort all items by time
    const allItems: UpNextItem[] = [...taskItems, ...mealItems, ...expenseItems]
      .sort((a, b) => {
        if (a.time && b.time) return a.time.localeCompare(b.time);
        if (a.time) return -1;
        if (b.time) return 1;
        return 0;
      })
      .slice(0, 5); // Limit to 5 items

    return {
      items: allItems,
      hasItems: allItems.length > 0
    };
  }, [tasks, meals, expenses, todayDate, toggleTask]);

  return <TodayUpNextView model={viewModel} />;
};
