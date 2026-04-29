import { useMemo } from "react";
import { useMealsStore } from "../store/useMealsStore";
import type { Weekday, Meal } from "../types/types";

const groupMealsByDay = (
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
  const meals = useMealsStore((state) => state.meals);
  return useMemo(() => groupMealsByDay(meals), [meals]);
};

export const useMeals = () => {
  const meals = useMealsStore((state) => state.meals);
  const addMeal = useMealsStore((state) => state.addMeal);

  const mealsByDay = useMemo(() => groupMealsByDay(meals), [meals]);

  return {
    meals,
    mealsByDay,
    actions: {
      addMeal,
    },
  };
};
