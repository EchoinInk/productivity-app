import { useMemo } from "react";
import { useMealsStore } from "../store/useMealsStore";
import { selectMealsByDays } from "../selectors/mealSelectors";
import type { Weekday, Meal } from "../types/types";

export const useMealsByDay = (): Record<Weekday, Meal[]> => {
  const meals = useMealsStore((state) => state.meals);
  return useMemo(() => selectMealsByDays(meals), [meals]);
};

export const useMeals = () => {
  const meals = useMealsStore((state) => state.meals);
  const addMeal = useMealsStore((state) => state.addMeal);

  const mealsByDay = useMemo(() => selectMealsByDays(meals), [meals]);

  return {
    meals,
    mealsByDay,
    actions: {
      addMeal,
    },
  };
};
