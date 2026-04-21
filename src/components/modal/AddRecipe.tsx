import { useState } from "react";
import { BottomSheetDialog } from "@/shared/ui/BottomSheetDialog";
import { FormActions } from "@/shared/ui/FormActions";

interface AddRecipeProps {
  open: boolean;
  onClose: () => void;
  onSave: (recipe: { name: string; ingredients: string[]; category?: string }) => void;
}

const categories = ["Breakfast", "Lunch", "Dinner"];

const AddRecipe = ({ open, onClose, onSave }: AddRecipeProps) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState("");
  const canSave = name.trim().length > 0;

  const reset = () => {
    setName("");
    setIngredients("");
    setCategory("");
  };

  return (
    <BottomSheetDialog open={open} title="Add Recipe" onClose={onClose}>
      <form className="space-y-4" onSubmit={(event) => {
        event.preventDefault();
        if (!canSave) return;
        onSave({ name: name.trim(), ingredients: ingredients.split(",").map((item) => item.trim()).filter(Boolean), category: category || undefined });
        reset();
        onClose();
      }}>
        <input autoFocus placeholder="Recipe name" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <textarea placeholder="Ingredients (comma separated)" value={ingredients} onChange={(e) => setIngredients(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-xl bg-background border border-border text-sm text-foreground resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <option value="">No category</option>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <FormActions onCancel={() => { reset(); onClose(); }} disabled={!canSave} />
      </form>
    </BottomSheetDialog>
  );
};

export default AddRecipe;
