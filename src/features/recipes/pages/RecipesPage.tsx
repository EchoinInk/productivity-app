import { useState } from "react";
import { Plus } from "lucide-react";
import AppCard from "@/components/AppCard";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import AddRecipe from "@/components/modal/AddRecipe";
import PageShell from "@/app/layout/PageShell";
import { useApplyRecipe } from "@/features/recipes/hooks/useApplyRecipe";
import { useRecipesStore } from "@/features/recipes/store/useRecipesStore";

const RecipesPage = () => {
  const recipes = useRecipesStore((s) => s.recipes);
  const addRecipe = useRecipesStore((s) => s.addRecipe);
  const applyRecipe = useApplyRecipe();
  const [open, setOpen] = useState(false);

  return (
    <PageShell>
      <PageHeader title="Recipes" />
      {recipes.length === 0 ? (
        <AppCard>
          <p className="text-sm text-muted-foreground text-center py-6">No recipes yet</p>
        </AppCard>
      ) : (
        recipes.map((recipe) => (
          <AppCard key={recipe.id}>
            <button
              type="button"
              onClick={() => applyRecipe(recipe)}
              className="w-full text-left rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{recipe.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {recipe.ingredients.length} ingredient{recipe.ingredients.length === 1 ? "" : "s"}
                    {recipe.category ? ` · ${recipe.category}` : ""}
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
      <AddRecipe open={open} onClose={() => setOpen(false)} onSave={(recipe) => addRecipe(recipe)} />
    </PageShell>
  );
};

export default RecipesPage;
