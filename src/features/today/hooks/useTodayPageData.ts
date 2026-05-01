import { useMemo } from "react";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useBudgetSummary } from "@/features/budget/hooks/useBudget";
import { useMealsStore } from "@/features/meals/store/useMealsStore";
import { useShoppingStore } from "@/features/shopping/store/useShoppingStore";
import { toDateString } from "@/shared/lib/date";

const WEEKDAYS = [
  "Sunday",
  "Monday", 
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const greetingFor = (d: Date): string => {
  const h = d.getHours();
  if (h < 12) return "Good morning 👋";
  if (h < 18) return "Good afternoon 👋";
  return "Good evening 👋";
};

export const useTodayPageData = (selectedDate: Date) => {
  const meals = useMealsStore((state) => state.meals);
  const shoppingItems = useShoppingStore((state) => state.shoppingItems);

  const selectedDateString = useMemo(
    () => toDateString(selectedDate),
    [selectedDate],
  );

  const { progress, sections, actions } = useTasks(selectedDateString);
  const budget = useBudgetSummary();

  const todaySection = useMemo(
    () => sections.find((s) => s.type === "today"),
    [sections],
  );

  const tasksCount = todaySection?.total ?? 0;
  const todayTasks = todaySection?.tasks ?? [];

  const todayWeekday = WEEKDAYS[selectedDate.getDay()];
  const mealsCount = useMemo(
    () => meals.filter((m) => m.day === todayWeekday).length,
    [meals, todayWeekday],
  );
  const shoppingCount = useMemo(
    () => shoppingItems.filter((item) => !item.done).length,
    [shoppingItems],
  );

  const greeting = greetingFor(selectedDate);

  return {
    // Data
    progress,
    budget,
    tasksCount,
    mealsCount,
    shoppingCount,
    todayTasks,
    selectedDateString,
    greeting,
    
    // Actions
    actions,
  };
};
