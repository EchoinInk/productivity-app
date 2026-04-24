import { useEffect, useState } from "react";
import { BottomSheetDialog } from "@/components/ui/BottomSheetDialog";
import { FormActions } from "@/components/ui/FormActions";
import { Field, ModalForm, SelectField } from "@/components/ui/FormField";
import { taskCategories } from "@/features/tasks/constants/categories";
import type { TaskCategory, TaskRecurrence } from "@/features/tasks/types";

interface AddTaskProps {
  open: boolean;
  onClose: () => void;
  defaultDate: string;
  onSave: (task: { label: string; date: string; time?: string; recurrence?: TaskRecurrence; category?: TaskCategory; notes?: string }) => void;
}

const AddTask = ({ open, onClose, onSave, defaultDate }: AddTaskProps) => {
  const [label, setLabel] = useState("");
  const [notes, setNotes] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [category, setCategory] = useState<TaskCategory | "">("");
  const [recurrence, setRecurrence] = useState<TaskRecurrence | "">("");

  useEffect(() => {
    if (!open) return;
    setDate(defaultDate);
  }, [defaultDate, open]);

  const canSave = label.trim().length > 0;

  const reset = () => {
    setLabel("");
    setNotes("");
    setTime("");
    setCategory("");
    setRecurrence("");
    setDate(defaultDate);
  };

  return (
    <BottomSheetDialog open={open} title="New Task" onClose={onClose}>
      <ModalForm
        onSubmit={(event) => {
          event.preventDefault();
          if (!canSave) return;
          onSave({ label: label.trim(), date, time: time || undefined, category: category || undefined, recurrence: recurrence || undefined, notes: notes || undefined });
          reset();
          onClose();
        }}
      >
        <div className="flex gap-2">
          <div className="flex-1">
            <Field id="add-task-date" label="Task date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="flex-1">
            <Field id="add-task-time" label="Task time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
        </div>
        <Field id="add-task-label" label="Task name" autoFocus placeholder="Task name" value={label} onChange={(e) => setLabel(e.target.value)} />
        <Field id="add-task-notes" label="Notes" placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <SelectField id="add-task-category" label="Category" value={category} onChange={(e) => setCategory(e.target.value as TaskCategory)} placeholder={!category}>
          <option value="" disabled>Category</option>
          {taskCategories.map((item) => <option key={item}>{item}</option>)}
        </SelectField>
        <SelectField id="add-task-recurrence" label="Recurrence" value={recurrence} onChange={(e) => setRecurrence(e.target.value as TaskRecurrence)} placeholder={!recurrence}>
          <option value="" disabled>Recurring</option>
          <option value="none">None</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </SelectField>
        <FormActions onCancel={onClose} disabled={!canSave} />
      </ModalForm>
    </BottomSheetDialog>
  );
};

export default AddTask;
