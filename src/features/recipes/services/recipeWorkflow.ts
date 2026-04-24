import { getToday } from "@/shared/lib/date";

import type { Recipe } from "@/features/recipes/types";
import type { CreateMealInput, Weekday } from "@/features/meals/types";
import type { CreateTaskInput } from "@/features/tasks/types";
import type { CreateShoppingItemInput } from "@/features/shopping/types";

const WEEKDAYS: Weekday[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const weekdayForToday = (): Weekday => WEEKDAYS[new Date().getDay()];

/**
 * Map ingredient → shopping category
 * (aligned with ShoppingCategory type)
 */
const mapIngredientToCategory = (
  ingredient: string
): CreateShoppingItemInput["category"] => {
  const name = ingredient.toLowerCase();

  // Food → Groceries
  if (
    name.includes("milk") ||
    name.includes("cheese") ||
    name.includes("chicken") ||
    name.includes("beef") ||
    name.includes("apple") ||
    name.includes("banana") ||
    name.includes("rice") ||
    name.includes("pasta")
  ) {
    return "Groceries";
  }

  // Everything else → Household
  return "Household";
};

/**
 * Workflow output type
 */
type RecipeWorkflow = {
  meal: CreateMealInput;
  shoppingItems: CreateShoppingItemInput[];
  task: CreateTaskInput;
};

export const buildRecipeWorkflow = (
  recipe: Pick<Recipe, "name" | "ingredients">
): RecipeWorkflow => {
  const today = getToday();

  return {
    meal: {
      name: recipe.name,
      day: weekdayForToday(),
    },

    shoppingItems: recipe.ingredients.map((ingredient) => ({
      name: ingredient,
      category: mapIngredientToCategory(ingredient),
    })),

    task: {
      label: `Cook ${recipe.name}`,
      date: today,
    },
  };
};