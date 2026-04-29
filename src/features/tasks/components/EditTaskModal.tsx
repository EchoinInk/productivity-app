import { useEffect, useState } from "react";
import { BottomSheetDialog } from "@/components/ui/BottomSheetDialog";
import { Button } from "@/components/ui/Button";
import { FormActions } from "@/components/ui/FormActions";
import { Field, ModalForm, SelectField, TextareaField } from "@/components/ui/FormField";
import { taskCategories } from "@/features/tasks/constants/categories";
import type { Task, TaskCategory, TaskRecurrence } from "@/features/tasks/types/types";

interface Props {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (updated: Task) => void;
  onDelete: () => void;
}

const EditTask = ({ open, onClose, task, onSave, onDelete }: Props) => {
  const [label, setLabel] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState<TaskCategory | "">("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [recurrence, setRecurrence] = useState<TaskRecurrence | "">("");

  useEffect(() => {
    if (!open || !task) return;
    setLabel(task.label);
    setNotes(task.notes ?? "");
    setCategory(task.category ?? "");
    setDate(task.date);
    setTime(task.time ?? "");
    setRecurrence(task.recurrence ?? "");
  }, [open, task]);

  if (!task) return null;

  const canSave = label.trim().length > 0;

  return (
    <BottomSheetDialog open={open} title="Edit Task" onClose={onClose}>
      <ModalForm
        onSubmit={(event) => {
          event.preventDefault();
          if (!canSave) return;
          onSave({
            ...task,
            label: label.trim(),
            notes: notes || undefined,
            date,
            time: time || undefined,
            recurrence: recurrence || undefined,
            category: category || undefined,
          });
        }}
      >
        <Field
          id="edit-task-label"
          label="Task name"
          autoFocus
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
        <TextareaField
          id="edit-task-notes"
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <div className="flex gap-2">
          <div className="flex-1">
            <Field
              id="edit-task-date"
              label="Task date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Field
              id="edit-task-time"
              label="Task time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <SelectField
          id="edit-task-category"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value as TaskCategory)}
          placeholder={!category}
        >
          <option value="" disabled>
            Category
          </option>
          {taskCategories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </SelectField>
        <SelectField
          id="edit-task-recurrence"
          label="Recurrence"
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value as TaskRecurrence)}
          placeholder={!recurrence}
        >
          <option value="" disabled>
            Recurring
          </option>
          <option value="none">None</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </SelectField>
        <FormActions onCancel={onClose} disabled={!canSave} />
        <Button variant="recall" fullWidth onClick={onDelete}>
          Delete Task
        </Button>
      </ModalForm>
    </BottomSheetDialog>
  );
};

export default EditTask;
