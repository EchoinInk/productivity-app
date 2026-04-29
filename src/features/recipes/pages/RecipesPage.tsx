import { useState } from "react";
import { Plus } from "lucide-react";

import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import AddRecipe from "@/features/recipes/components/AddRecipeModal";
import { useApplyRecipe } from "@/features/recipes/hooks/useApplyRecipe";
import { useRecipesStore } from "@/features/recipes/store/useRecipesStore";
import { useRecipes } from "@/features/recipes/store/useRecipesStore";
import { EmptyState } from "@/components/ui/EmptyState";
import { HeroTitle, Meta, Highlight } from "@/components/ui/Text";

const RecipesPage = () => {
  const recipes = useRecipes();
  const addRecipe = useRecipesStore((state) => state.addRecipe);

  const { applyRecipe } = useApplyRecipe();

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <Header title="Recipes" />

        {recipes.length === 0 ? (
          <Card>
            <CardBody>
              <EmptyState
                title="No recipes yet"
                description="Start by adding your first recipe"
                action={
                  <Button onClick={() => setOpen(true)}>
                    Add Recipe
                  </Button>
                }
                className="py-6"
              />
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-4">
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
                        <HeroTitle>
                          {recipe.name}
                        </HeroTitle>

                        <Meta className="mt-0.5">
                          {recipe.ingredients.length} ingredient
                          {recipe.ingredients.length === 1 ? "" : "s"}
                          {recipe.category ? ` · ${recipe.category}` : ""}
                        </Meta>
                      </div>

                      <Highlight className="opacity-70">
                        Use
                      </Highlight>
                    </div>
                  </button>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {/* Only show when recipes exist */}
        {recipes.length > 0 && (
          <Button fullWidth onClick={() => setOpen(true)}>
            <Plus size={16} /> Add Recipe
          </Button>
        )}
      </div>

      {/* MODAL OUTSIDE */}
      <AddRecipe
        open={open}
        onClose={() => setOpen(false)}
        onSave={addRecipe}
      />
    </>
  );
};

export default RecipesPage;
