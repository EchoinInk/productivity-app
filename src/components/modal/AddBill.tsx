import { useState } from "react";
import AppCard from "@/components/AppCard";

interface AddBillProps {
  open: boolean;
  onClose: () => void;
  onSave: (bill: { name: string; amount: number; date: string }) => void;
}

const AddBill = ({ open, onClose, onSave }: AddBillProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  if (!open) return null;

  const canSave = name.trim().length > 0 && parseFloat(amount) > 0 && date.length > 0;

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
          <h2 className="text-lg font-semibold">Add Bill</h2>

          <input
            autoFocus
            placeholder="Bill name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm bg-background"
          />

          <input
            type="number"
            inputMode="decimal"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm bg-background"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm bg-background"
          />

          <div className="flex gap-2 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-lg bg-secondary border border-border text-sm"
            >
              Cancel
            </button>
            <button
              disabled={!canSave}
              onClick={() => {
                if (!canSave) return;
                onSave({ name, amount: parseFloat(amount), date });
                setName("");
                setAmount("");
                setDate("");
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

export default AddBill;
