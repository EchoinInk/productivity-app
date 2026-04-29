import { useState } from "react";
import { BottomSheetDialog } from "@/components/ui/BottomSheetDialog";
import { FormActions } from "@/components/ui/FormActions";
import { Field, ModalForm } from "@/components/ui/FormField";

interface AddBillProps {
  open: boolean;
  onClose: () => void;
  onSave: (bill: { name: string; amount: number; date: string }) => void;
}

const AddBill = ({ open, onClose, onSave }: AddBillProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const canSave = name.trim().length > 0 && parseFloat(amount) > 0 && date.length > 0;

  return (
    <BottomSheetDialog open={open} title="Add Bill" onClose={onClose}>
      <ModalForm onSubmit={(event) => {
        event.preventDefault();
        if (!canSave) return;
        onSave({ name: name.trim(), amount: parseFloat(amount), date });
        setName("");
        setAmount("");
        setDate("");
        onClose();
      }}>
        <Field id="add-bill-name" label="Bill name" autoFocus placeholder="Bill name" value={name} onChange={(e) => setName(e.target.value)} />
        <Field id="add-bill-amount" label="Amount" type="number" inputMode="decimal" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Field id="add-bill-date" label="Due date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <FormActions onCancel={onClose} disabled={!canSave} />
      </ModalForm>
    </BottomSheetDialog>
  );
};

export default AddBill;
