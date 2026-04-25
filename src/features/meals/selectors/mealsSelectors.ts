import { useMemo } from "react";
import type { Meal } from "@/features/meals/types";
import type { Weekday } from "@/features/meals/constants/weekdays";
import { useMealsStore } from "@/features/meals/store/useMealsStore";

export const selectAllMeals = (state: { meals: Meal[] }) => state.meals;

export const groupMealsByDay = (
  meals: Meal[],
): Record<Weekday, Meal[]> => {
  const groups = {} as Record<Weekday, Meal[]>;
  for (const meal of meals) {
    const key = meal.day as Weekday;
    (groups[key] ??= []).push(meal);
  }
  return groups;
};

export const useMealsByDay = (): Record<Weekday, Meal[]> => {
  const meals = useMealsStore(selectAllMeals);
  return useMemo(() => groupMealsByDay(meals), [meals]);
};
