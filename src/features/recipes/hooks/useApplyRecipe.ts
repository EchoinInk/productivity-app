import { buildRecipeWorkflow } from "@/features/recipes/services/recipeWorkflow";
import type { Recipe } from "@/features/recipes/types";
import type { useAppStore } from "@/store/useAppStore";

type Store = ReturnType<typeof useAppStore.getState>;

export const applyRecipe = (recipe: Pick<Recipe, "name" | "ingredients">, actions: Pick<Store, "addMeal" | "addShoppingItem" | "addTask">) => {
  const workflow = buildRecipeWorkflow(recipe);
  actions.addMeal(workflow.meal);
  workflow.shoppingItems.forEach((item) => actions.addShoppingItem(item));
  actions.addTask(workflow.task);
};
