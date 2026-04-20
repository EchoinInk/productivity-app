import { useState } from "react";
import AppCard from "@/components/AppCard";

interface AddShoppingItemProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: { name: string }) => void;
}

const AddShoppingItem = ({ open, onClose, onSave }: AddShoppingItemProps) => {
  const [name, setName] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md p-4">
        <AppCard className="space-y-4">
          <h2 className="text-lg font-semibold">Add Item</h2>

          <input
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm"
          />

          <div className="flex gap-2 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-lg bg-secondary border border-border text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!name.trim()) return;
                onSave({ name });
                setName("");
                onClose();
              }}
              className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-sm"
            >
              Add
            </button>
          </div>
        </AppCard>
      </div>
    </div>
  );
};

export default AddShoppingItem;
