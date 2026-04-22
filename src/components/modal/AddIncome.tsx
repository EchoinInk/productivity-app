import { useState } from "react";
import { BottomSheetDialog } from "@/shared/ui/BottomSheetDialog";

interface AddIncomeProps {
  open: boolean;
  onClose: () => void;
  onSave: (amount: number) => void;
}

const AddIncome = ({ open, onClose, onSave }: AddIncomeProps) => {
  const [amount, setAmount] = useState("");

  return (
    <BottomSheetDialog open={open} onClose={onClose} title="Add Income">
      <div className="space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Income amount"
          className="w-full border rounded-lg px-3 py-2"
        />

        <button
          className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold"
          onClick={() => {
            if (!amount) return;
            onSave(Number(amount));
            onClose();
          }}
        >
          Save Income
        </button>
      </div>
    </BottomSheetDialog>
  );
};

export default AddIncome;
