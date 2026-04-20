import { useState } from "react";
import AppCard from "@/components/AppCard";

interface AddExpenseProps {
  open: boolean;
  onClose: () => void;
  onSave: (expense: { name: string; amount: string }) => void;
}

const AddExpense = ({ open, onClose, onSave }: AddExpenseProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md p-4">
        <AppCard className="space-y-4">
          <h2 className="text-lg font-semibold">Add Expense</h2>

          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm"
          />

          <input
            type="number"
            placeholder="$ Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
                onSave({ name, amount });
                setName("");
                setAmount("");
                onClose();
              }}
              className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-sm"
            >
              Save
            </button>
          </div>
        </AppCard>
      </div>
    </div>
  );
};

export default AddExpense;
