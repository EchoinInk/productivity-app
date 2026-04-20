import { useState } from "react";
import AppCard from "@/components/AppCard";

interface AddRecipeProps {
  open: boolean;
  onClose: () => void;
  onSave: (recipe: { name: string; ingredients: string[]; category?: string }) => void;
}

const categories = ["Breakfast", "Lunch", "Dinner"];

const AddRecipe = ({ open, onClose, onSave }: AddRecipeProps) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState<string>("");

  if (!open) return null;

  const canSave = name.trim().length > 0;

  const reset = () => {
    setName("");
    setIngredients("");
    setCategory("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md p-4 animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <AppCard className="space-y-4">
          <h2 className="text-lg font-semibold">Add Recipe</h2>

          <input
            autoFocus
            placeholder="Recipe name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm bg-background"
          />

          <textarea
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm bg-background resize-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm bg-background"
          >
            <option value="">No category</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                reset();
                onClose();
              }}
              className="flex-1 py-2 rounded-lg bg-secondary border border-border text-sm"
            >
              Cancel
            </button>
            <button
              disabled={!canSave}
              onClick={() => {
                if (!canSave) return;
                const list = ingredients
                  .split(",")
                  .map((i) => i.trim())
                  .filter(Boolean);
                onSave({
                  name: name.trim(),
                  ingredients: list,
                  category: category || undefined,
                });
                reset();
                onClose();
              }}
              className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-sm disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </AppCard>
      </div>
    </div>
  );
};

export default AddRecipe;
