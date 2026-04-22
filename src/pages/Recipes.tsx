import { useState } from "react";
import { Plus } from "lucide-react";
import AppCard from "@/components/AppCard";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import AddRecipe from "@/components/modal/AddRecipe";
import { useAppStore } from "@/store/useAppStore";

const Recipes = () => {
  const recipes = useAppStore((s) => s.recipes);
  const addRecipe = useAppStore((s) => s.addRecipe);
  const addMeal = useAppStore((s) => s.addMeal);
  const addShoppingItem = useAppStore((s) => s.addShoppingItem);
  const addTask = useAppStore((s) => s.addTask);

  const [open, setOpen] = useState(false);

  const useRecipe = (recipe: { name: string; ingredients: string[] }) => {
    addMeal(recipe.name, "Monday");
    recipe.ingredients.forEach((ing) => addShoppingItem(ing));
    addTask(`Cook ${recipe.name}`, "Today");
  };

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <PageHeader title="Recipes" />

      {recipes.length === 0 ? (
        <AppCard>
          <p className="text-sm text-muted-foreground text-center py-6">
            No recipes yet
          </p>
        </AppCard>
      ) : (
        recipes.map((r) => (
          <AppCard key={r.id}>
            <button
              onClick={() => useRecipe(r)}
              className="w-full text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {r.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {r.ingredients.length} ingredient
                    {r.ingredients.length === 1 ? "" : "s"}
                    {r.category ? ` · ${r.category}` : ""}
                  </p>
                </div>
                <span className="text-xs text-primary font-medium">Use</span>
              </div>
            </button>
          </AppCard>
        ))
      )}

      <ActionButton fullWidth onClick={() => setOpen(true)}>
        <Plus size={16} /> Add Recipe
      </ActionButton>

      <AddRecipe
        open={open}
        onClose={() => setOpen(false)}
        onSave={(r) => addRecipe(r)}
      />
    </div>
  );
};

export default Recipes;
