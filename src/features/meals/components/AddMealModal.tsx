import { useState } from "react";
import { BottomSheetDialog } from "@/components/ui/BottomSheetDialog";
import { FormActions } from "@/components/ui/FormActions";
import { Field, ModalForm, SelectField } from "@/components/ui/FormField";
import type { Weekday } from "@/features/meals/types/types";

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
      <ModalForm onSubmit={(event) => {
        event.preventDefault();
        if (!canSave) return;
        onSave({ name: name.trim(), day });
        setName("");
        setDay("Monday");
        onClose();
      }}>
        <Field id="add-meal-name" label="Meal name" autoFocus placeholder="Meal name" value={name} onChange={(e) => setName(e.target.value)} />
        <SelectField id="add-meal-day" label="Day" value={day} onChange={(e) => setDay(e.target.value as Weekday)}>
          {days.map((item) => <option key={item}>{item}</option>)}
        </SelectField>
        <FormActions onCancel={onClose} disabled={!canSave} />
      </ModalForm>
    </BottomSheetDialog>
  );
};

export default AddMeal;
