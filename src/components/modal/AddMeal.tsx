import { useState } from "react";
import { BottomSheetDialog } from "@/components/ui/BottomSheetDialog";
import { FormActions } from "@/components/ui/FormActions";
import type { Weekday } from "@/features/meals/types";

interface AddMealProps {
  open: boolean;
  onClose: () => void;
  onSave: (meal: { name: string; day: Weekday }) => void;
}

const days: Weekday[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AddMeal = ({ open, onClose, onSave }: AddMealProps) => {
  const [name, setName] = useState("");
  const [day, setDay] = useState<Weekday>("Monday");
  const canSave = name.trim().length > 0;

  return (
    <BottomSheetDialog open={open} title="Add Meal" onClose={onClose}>
      <form className="space-y-4" onSubmit={(event) => {
        event.preventDefault();
        if (!canSave) return;
        onSave({ name: name.trim(), day });
        setName("");
        setDay("Monday");
        onClose();
      }}>
        <label htmlFor="add-meal-name" className="sr-only">Meal name</label>
        <input id="add-meal-name" autoFocus placeholder="Meal name" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <label htmlFor="add-meal-day" className="sr-only">Day</label>
        <select id="add-meal-day" value={day} onChange={(e) => setDay(e.target.value as Weekday)} className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          {days.map((item) => <option key={item}>{item}</option>)}
        </select>
        <FormActions onCancel={onClose} disabled={!canSave} />
      </form>
    </BottomSheetDialog>
  );
};

export default AddMeal;
