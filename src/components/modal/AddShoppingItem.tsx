import { useState } from "react";
import { BottomSheetDialog } from "@/shared/ui/BottomSheetDialog";
import { FormActions } from "@/shared/ui/FormActions";

interface AddShoppingItemProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: { name: string }) => void;
}

const AddShoppingItem = ({ open, onClose, onSave }: AddShoppingItemProps) => {
  const [name, setName] = useState("");
  const canSave = name.trim().length > 0;

  return (
    <BottomSheetDialog open={open} title="Add Item" onClose={onClose}>
      <form className="space-y-4" onSubmit={(event) => {
        event.preventDefault();
        if (!canSave) return;
        onSave({ name: name.trim() });
        setName("");
        onClose();
      }}>
        <input autoFocus placeholder="Item name" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <FormActions onCancel={onClose} submitLabel="Add" disabled={!canSave} />
      </form>
    </BottomSheetDialog>
  );
};

export default AddShoppingItem;
