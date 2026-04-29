import { useState } from "react";
import { BottomSheetDialog } from "@/components/ui/BottomSheetDialog";
import { FormActions } from "@/components/ui/FormActions";
import { Field, ModalForm } from "@/components/ui/FormField";

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
      <ModalForm onSubmit={(event) => {
        event.preventDefault();
        if (!canSave) return;
        onSave({ name: name.trim(), amount: parseFloat(amount) });
        setName("");
        setAmount("");
        onClose();
      }}>
        <Field id="add-expense-name" label="Expense name" autoFocus placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Field id="add-expense-amount" label="Expense amount" type="number" inputMode="decimal" placeholder="$ Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <FormActions onCancel={onClose} disabled={!canSave} />
      </ModalForm>
    </BottomSheetDialog>
  );
};

export default AddExpense;
