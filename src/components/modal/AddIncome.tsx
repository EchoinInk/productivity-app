import { useState } from "react";
import { BottomSheetDialog } from "@/components/ui/BottomSheetDialog";
import { FormActions } from "@/components/ui/FormActions";

interface AddIncomeProps {
  open: boolean;
  onClose: () => void;
  onSave: (amount: number) => void;
}

const AddIncome = ({ open, onClose, onSave }: AddIncomeProps) => {
  const [amount, setAmount] = useState("");
  const canSave = Number(amount) > 0;

  return (
    <BottomSheetDialog open={open} onClose={onClose} title="Add Income">
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!canSave) return;
          onSave(Number(amount));
          setAmount("");
          onClose();
        }}
      >
        <label htmlFor="add-income-amount" className="sr-only">Income amount</label>
        <input
          id="add-income-amount"
          type="number"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Income amount"
          className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />

        <FormActions onCancel={onClose} submitLabel="Save Income" disabled={!canSave} />
      </form>
    </BottomSheetDialog>
  );
};

export default AddIncome;
