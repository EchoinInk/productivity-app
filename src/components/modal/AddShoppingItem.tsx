import { useState } from "react";
import { BottomSheetDialog } from "@/components/ui/BottomSheetDialog";
import { FormActions } from "@/components/ui/FormActions";
import type { ShoppingCategory } from "@/features/shopping/types";

interface AddShoppingItemProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: { name: string; category: ShoppingCategory }) => void;
  category: ShoppingCategory;
}

const AddShoppingItem = ({
  open,
  onClose,
  onSave,
  category,
}: AddShoppingItemProps) => {
  const [name, setName] = useState("");

  const canSave = name.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;

    onSave({
      name: name.trim(),
      category,
    });

    setName("");
    onClose();
  };

  return (
    <BottomSheetDialog open={open} title="Add Shopping Item" onClose={onClose}>
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          handleSave();
        }}
      >
        <label htmlFor="add-shopping-item-name" className="sr-only">Item name</label>
        <input
          id="add-shopping-item-name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />

        <FormActions onCancel={onClose} submitLabel="Add Item" disabled={!canSave} />
      </form>
    </BottomSheetDialog>
  );
};

export default AddShoppingItem;
