import { getToday } from "@/shared/lib/date";
import type { CreateTaskInput } from "@/features/tasks/types";
import type { Recipe } from "@/features/recipes/types";

export const buildRecipeWorkflow = (recipe: Pick<Recipe, "name" | "ingredients">) => ({
  meal: { name: recipe.name, day: "Monday" as const },
  shoppingItems: recipe.ingredients.map((name) => ({ name })),
  task: { label: `Cook ${recipe.name}`, date: getToday() } satisfies CreateTaskInput,
});
