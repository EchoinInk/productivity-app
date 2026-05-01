import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createId } from "@/shared/lib/id";
import { createNamespacedStorage, STORE_VERSION } from "@/store/sharedPersist";
import { useActivityStore } from "@/features/activity/useActivityStore";
import { createActivityEvent } from "@/features/activity/activity.utils";
import type { CreateMealInput, Meal } from "@/features/meals/types/types";

interface MealsState {
  meals: Meal[];
  addMeal: (input: CreateMealInput) => void;
}

export const useMealsStore = create<MealsState>()(
  persist(
    (set) => ({
      meals: [],
      addMeal: (input) =>
        set((state) => {
          // Track activity
          useActivityStore.getState().addEvent(
            createActivityEvent("meal_logged", `Logged meal: ${input.name}`)
          );

          return { meals: [{ id: createId(), ...input }, ...state.meals] };
        }),
    }),
    {
      name: "meals",
      version: STORE_VERSION,
      storage: createNamespacedStorage<Pick<MealsState, "meals">>(["meals"]),
      partialize: (state) => ({ meals: state.meals }),
    },
  ),
);
