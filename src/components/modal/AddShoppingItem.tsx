import { useState } from "react";
import type { ShoppingCategory } from "@/features/shopping/types";

interface AddShoppingItemProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: { name: string; category: ShoppingCategory }) => void;
  category: ShoppingCategory; // ✅ NEW
}

const AddShoppingItem = ({
  open,
  onClose,
  onSave,
  category,
}: AddShoppingItemProps) => {
  const [name, setName] = useState("");

  if (!open) return null;

  const handleSave = () => {
    if (!name.trim()) return;

    onSave({
      name,
      category, // ✅ FIX
    });

    setName("");
    onClose();
  };

  return (
    <div className="p-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
        className="w-full border rounded px-3 py-2"
      />

      <button
        onClick={handleSave}
        className="mt-3 w-full bg-primary text-white py-2 rounded"
      >
        Add Item
      </button>
    </div>
  );
};

export default AddShoppingItem;