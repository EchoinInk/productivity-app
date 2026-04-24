import { useState } from "react";
import { BottomSheetDialog } from "@/components/ui/BottomSheetDialog";
import { FormActions } from "@/components/ui/FormActions";

interface AddExpenseProps {
  open: boolean;
  onClose: () => void;
  onSave: (expense: { name: string; amount: number }) => void;
}

const AddExpense = ({ open, onClose, onSave }: AddExpenseProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const canSave = name.trim().length > 0 && parseFloat(amount) > 0;

  return (
    <BottomSheetDialog open={open} title="Add Expense" onClose={onClose}>
      <form className="space-y-4" onSubmit={(event) => {
        event.preventDefault();
        if (!canSave) return;
        onSave({ name: name.trim(), amount: parseFloat(amount) });
        setName("");
        setAmount("");
        onClose();
      }}>
        <label htmlFor="add-expense-name" className="sr-only">Expense name</label>
        <input id="add-expense-name" autoFocus placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <label htmlFor="add-expense-amount" className="sr-only">Expense amount</label>
        <input id="add-expense-amount" type="number" inputMode="decimal" placeholder="$ Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <FormActions onCancel={onClose} disabled={!canSave} />
      </form>
    </BottomSheetDialog>
  );
};

export default AddExpense;
