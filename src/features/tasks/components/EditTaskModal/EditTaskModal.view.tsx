import { BottomSheetDialog } from "@/components/ui/BottomSheetDialog";
import { Button } from "@/components/ui/Button";
import { FormActions } from "@/components/ui/FormActions";
import { Field, ModalForm, SelectField, TextareaField } from "@/components/ui/FormField";
import { taskCategories } from "@/features/tasks/constants/categories";
import type { TaskCategory, TaskRecurrence } from "@/features/tasks/types/types";

export interface EditTaskModalViewModel {
  open: boolean;
  label: string;
  notes: string;
  category: TaskCategory | "";
  date: string;
  time: string;
  recurrence: TaskRecurrence | "";
  canSave: boolean;
  onClose: () => void;
  onSave: (event: React.FormEvent) => void;
  onLabelChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onCategoryChange: (value: TaskCategory) => void;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onRecurrenceChange: (value: TaskRecurrence) => void;
  onDelete: () => void;
}

export const EditTaskModalView = ({ model }: { model: EditTaskModalViewModel }) => {
  const {
    open,
    label,
    notes,
    category,
    date,
    time,
    recurrence,
    canSave,
    onClose,
    onSave,
    onLabelChange,
    onNotesChange,
    onCategoryChange,
    onDateChange,
    onTimeChange,
    onRecurrenceChange,
    onDelete,
  } = model;

  return (
    <BottomSheetDialog open={open} title="Edit Task" onClose={onClose}>
      <ModalForm onSubmit={onSave}>
        <Field
          id="edit-task-label"
          label="Task name"
          autoFocus
          value={label}
          onChange={(e) => onLabelChange(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
        <TextareaField
          id="edit-task-notes"
          label="Notes"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
        />
        <div className="flex gap-2">
          <div className="flex-1">
            <Field
              id="edit-task-date"
              label="Task date"
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Field
              id="edit-task-time"
              label="Task time"
              type="time"
              value={time}
              onChange={(e) => onTimeChange(e.target.value)}
            />
          </div>
        </div>
        <SelectField
          id="edit-task-category"
          label="Category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as TaskCategory)}
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
          onChange={(e) => onRecurrenceChange(e.target.value as TaskRecurrence)}
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
        <Button variant="recall" fullWidth onClick={onDelete} aria-label="Delete this task">
          Delete Task
        </Button>
      </ModalForm>
    </BottomSheetDialog>
  );
};
