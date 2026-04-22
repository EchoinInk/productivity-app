import type { StateCreator } from "zustand";
import { createId } from "@/shared/lib/id";
import type { CreateMealInput, Meal } from "@/features/meals/types";
import type { AppState } from "@/store/rootStore";

export interface MealsSlice {
  meals: Meal[];
  addMeal: (input: CreateMealInput) => void;
}

export const createMealsSlice: StateCreator<AppState, [], [], MealsSlice> = (set) => ({
  meals: [],
  addMeal: (input) => set((state) => ({ meals: [{ id: createId(), ...input }, ...state.meals] })),
});
