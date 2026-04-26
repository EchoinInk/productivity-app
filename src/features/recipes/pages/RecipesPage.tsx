import { useState } from "react";
import { Plus } from "lucide-react";

import { Card, CardBody } from "@/components/ui/Card";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import AddRecipe from "@/components/modal/AddRecipe";
import PageShell from "@/app/layout/PageShell";
import { useApplyRecipe } from "@/features/recipes/hooks/useApplyRecipe";
import { useRecipesStore } from "@/features/recipes/store/useRecipesStore";
import EmptyState from "@/components/ui/EmptyState";
import { UIText } from "@/components/ui/Text";

const RecipesPage = () => {
  const recipes = useRecipesStore((s) => s.recipes);
  const addRecipe = useRecipesStore((s) => s.addRecipe);

  const { applyRecipe } = useApplyRecipe();

  const [open, setOpen] = useState(false);

  return (
    <PageShell>
      <div className="space-y-4">
        <PageHeader title="Recipes" />

        {recipes.length === 0 ? (
          <Card>
            <CardBody>
              <EmptyState
                title="No recipes yet"
                description="Start by adding your first recipe"
                action={
                  <ActionButton onClick={() => setOpen(true)}>
                    Add Recipe
                  </ActionButton>
                }
                className="py-6"
              />
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-2">
            {recipes.map((recipe) => (
              <Card key={recipe.id}>
                <CardBody>
                  <button
                    type="button"
                    onClick={() => applyRecipe(recipe)}
                    className="w-full text-left rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:opacity-80 transition"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <UIText.HeadingL>
                          {recipe.name}
                        </UIText.HeadingL>

                        <UIText.Meta className="mt-0.5">
                          {recipe.ingredients.length} ingredient
                          {recipe.ingredients.length === 1 ? "" : "s"}
                          {recipe.category ? ` · ${recipe.category}` : ""}
                        </UIText.Meta>
                      </div>

                      <UIText.Highlight className="opacity-70">
                        Use
                      </UIText.Highlight>
                    </div>
                  </button>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {/* Only show when recipes exist */}
        {recipes.length > 0 && (
          <ActionButton fullWidth onClick={() => setOpen(true)}>
            <Plus size={16} /> Add Recipe
          </ActionButton>
        )}
      </div>

      {/* MODAL OUTSIDE */}
      <AddRecipe
        open={open}
        onClose={() => setOpen(false)}
        onSave={addRecipe}
      />
    </PageShell>
  );
};

export default RecipesPage;
