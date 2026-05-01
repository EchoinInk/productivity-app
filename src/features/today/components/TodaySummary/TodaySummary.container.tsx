import { useMemo } from "react";
import { CheckSquare, Utensils, DollarSign, ShoppingCart } from "lucide-react";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { useMealsStore } from "@/features/meals/store/useMealsStore";
import { useShoppingStore } from "@/features/shopping/store/useShoppingStore";
import { getToday } from "@/shared/lib/date";
import { TodaySummaryView, type TodaySummaryViewModel } from "./TodaySummary.view";
import type { SummaryCardViewModel } from "../SummaryCard/SummaryCard.view";

export const TodaySummaryContainer = () => {
  const tasks = useTasksStore((state) => state.tasks);
  const weeklyBudget = useBudgetStore((state) => state.weeklyBudget);
  const expenses = useBudgetStore((state) => state.expenses);
  const meals = useMealsStore((state) => state.meals);
  const shoppingItems = useShoppingStore((state) => state.shoppingItems);

  const todayDate = getToday();

  const viewModel = useMemo((): TodaySummaryViewModel => {
    // Calculate tasks summary
    const todayTasks = tasks.filter((task) => task.date === todayDate);
    const completedTasks = todayTasks.filter((task) => 
      task.completedDates.includes(todayDate)
    );

    // Calculate budget summary
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const remainingBudget = weeklyBudget - totalExpenses;

    // Calculate meals summary
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const todayWeekday = weekdays[new Date().getDay()];
    const todayMeals = meals.filter((meal) => meal.day === todayWeekday);
    const targetMeals = 3;

    // Calculate shopping summary
    const incompleteShoppingItems = shoppingItems.filter((item) => !item.done);

    const cards: SummaryCardViewModel[] = [
      {
        title: "Tasks",
        value: `${completedTasks.length}/${todayTasks.length}`,
        subtitle: "completed today",
        icon: <CheckSquare size={20} />,
        variant: completedTasks.length === todayTasks.length ? "success" : "default"
      },
      {
        title: "Meals",
        value: `${todayMeals.length}/${targetMeals}`,
        subtitle: "logged today",
        icon: <Utensils size={20} />,
        variant: todayMeals.length >= targetMeals ? "success" : "default"
      },
      {
        title: "Budget",
        value: `$${Math.round(remainingBudget)}`,
        subtitle: "remaining today",
        icon: <DollarSign size={20} />,
        variant: remainingBudget > 0 ? "success" : "warning"
      },
      {
        title: "Shopping",
        value: incompleteShoppingItems.length.toString(),
        subtitle: "items left",
        icon: <ShoppingCart size={20} />,
        variant: incompleteShoppingItems.length === 0 ? "success" : "default"
      }
    ];

    return { cards };
  }, [tasks, weeklyBudget, expenses, meals, shoppingItems, todayDate]);

  return <TodaySummaryView model={viewModel} />;
};
