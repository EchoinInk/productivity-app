/**
 * Cross-feature workflow: applying a recipe writes to meals, shopping, and tasks.
 * Lives in the recipes feature because it's owned by recipes; uses other
 * feature stores via their public hooks. This is the only sanctioned way for
 * one feature to mutate another's store.
 */
import { useCallback } from "react";
import { useMealsStore } from "@/features/meals/store/useMealsStore";
import { useShoppingStore } from "@/features/shopping/store/useShoppingStore";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { buildRecipeWorkflow } from "@/features/recipes/services/recipeWorkflow";
import type { Recipe } from "@/features/recipes/types";

export const useApplyRecipe = () => {
  const addMeal = useMealsStore((s) => s.addMeal);
  const addShoppingItem = useShoppingStore((s) => s.addShoppingItem);
  const addTask = useTasksStore((s) => s.addTask);

  return useCallback(
    (recipe: Pick<Recipe, "name" | "ingredients">) => {
      const workflow = buildRecipeWorkflow(recipe);
      addMeal(workflow.meal);
      workflow.shoppingItems.forEach((item) => addShoppingItem(item));
      addTask(workflow.task);
    },
    [addMeal, addShoppingItem, addTask],
  );
};
