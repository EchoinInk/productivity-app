import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useMemo } from "react";
import { createId } from "@/shared/lib/id";
import { createNamespacedStorage, STORE_VERSION } from "@/store/sharedPersist";
import type { CreateMealInput, Meal, Weekday } from "@/features/meals/types/types";

interface MealsState {
  meals: Meal[];
  addMeal: (input: CreateMealInput) => void;
}

export const useMealsStore = create<MealsState>()(
  persist(
    (set) => ({
      meals: [],
      addMeal: (input) =>
        set((state) => ({ meals: [{ id: createId(), ...input }, ...state.meals] })),
    }),
    {
      name: "meals",
      version: STORE_VERSION,
      storage: createNamespacedStorage<Pick<MealsState, "meals">>(["meals"]),
      partialize: (state) => ({ meals: state.meals }),
    },
  ),
);

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
