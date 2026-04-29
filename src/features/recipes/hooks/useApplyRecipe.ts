import { useCallback } from "react";

import { useMealsStore } from "@/features/meals/store/useMealsStore";
import { selectAddMeal } from "@/features/meals/selectors/mealsSelectors";

import { useShoppingStore } from "@/features/shopping/store/useShoppingStore";
import { selectAddShoppingItem } from "@/features/shopping/selectors/shoppingSelectors";

import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { selectAddTask } from "@/features/tasks/selectors/taskSelectors";

import { buildRecipeWorkflow } from "@/features/recipes/services/recipeWorkflow";

import type { Recipe } from "@/features/recipes/types";

export const useApplyRecipe = () => {

  const addMeal = useMealsStore(selectAddMeal);

  const addShoppingItem = useShoppingStore(selectAddShoppingItem);

  const addTask = useTasksStore(selectAddTask);

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