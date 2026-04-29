import { useState } from "react";
import { BottomSheetDialog } from "@/components/ui/BottomSheetDialog";
import { FormActions } from "@/components/ui/FormActions";
import { Field, ModalForm } from "@/components/ui/FormField";
import type { ShoppingCategory } from "@/features/shopping/types/types";

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
      <ModalForm
        onSubmit={(event) => {
          event.preventDefault();
          handleSave();
        }}
      >
        <Field
          id="add-shopping-item-name"
          label="Item name"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
        />

        <FormActions onCancel={onClose} submitLabel="Add Item" disabled={!canSave} />
      </ModalForm>
    </BottomSheetDialog>
  );
};

export default AddShoppingItem;
