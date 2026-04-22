import type { StateCreator } from "zustand";
import { createId } from "@/shared/lib/id";
import type { CreateRecipeInput, Recipe } from "@/features/recipes/types";
import type { AppState } from "@/store/rootStore";

export interface RecipesSlice {
  recipes: Recipe[];
  addRecipe: (input: CreateRecipeInput) => void;
}

export const createRecipesSlice: StateCreator<AppState, [], [], RecipesSlice> = (set) => ({
  recipes: [],
  addRecipe: (input) => set((state) => ({ recipes: [{ id: createId(), ...input }, ...state.recipes] })),
});
