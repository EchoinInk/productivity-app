import { useState } from "react";
import { BottomSheetDialog } from "@/components/ui/BottomSheetDialog";
import { FormActions } from "@/components/ui/FormActions";

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
      <form className="space-y-4" onSubmit={(event) => {
        event.preventDefault();
        if (!canSave) return;
        onSave({ name: name.trim(), amount: parseFloat(amount), date });
        setName("");
        setAmount("");
        setDate("");
        onClose();
      }}>
        <input autoFocus placeholder="Bill name" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <input type="number" inputMode="decimal" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <FormActions onCancel={onClose} disabled={!canSave} />
      </form>
    </BottomSheetDialog>
  );
};

export default AddBill;
