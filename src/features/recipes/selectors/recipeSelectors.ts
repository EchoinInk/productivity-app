import type { Recipe } from "@/features/recipes/types";

export const selectAllRecipes = (state: { recipes: Recipe[] }) => state.recipes;

/** Action selectors — keep references stable across renders. */
export const selectAddRecipe = (s: { recipes: Recipe[]; addRecipe: (input: Omit<Recipe, 'id'>) => void }) => s.addRecipe;
