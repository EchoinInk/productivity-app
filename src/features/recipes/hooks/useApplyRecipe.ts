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

  const applyRecipe = useCallback(

    (recipe: Pick<Recipe, "name" | "ingredients">) => {

      const workflow = buildRecipeWorkflow(recipe);

      addMeal(workflow.meal);

      workflow.shoppingItems.forEach(addShoppingItem);

      addTask(workflow.task);

    },

    [addMeal, addShoppingItem, addTask],

  );

  return { applyRecipe };

};