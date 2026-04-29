import { BottomSheetDialog } from "@/components/ui/BottomSheetDialog";
import { FormActions } from "@/components/ui/FormActions";
import { Field, ModalForm, SelectField } from "@/components/ui/FormField";
import { taskCategories } from "@/features/tasks/constants/categories";
import type { TaskCategory, TaskRecurrence } from "@/features/tasks/types/types";

export interface AddTaskModalViewModel {
  open: boolean;
  label: string;
  notes: string;
  time: string;
  date: string;
  category: TaskCategory | "";
  recurrence: TaskRecurrence | "";
  canSave: boolean;
  onClose: () => void;
  onSave: (event: React.FormEvent) => void;
  onLabelChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onCategoryChange: (value: TaskCategory) => void;
  onRecurrenceChange: (value: TaskRecurrence) => void;
}

export const AddTaskModalView = ({ model }: { model: AddTaskModalViewModel }) => {
  const {
    open,
    label,
    notes,
    time,
    date,
    category,
    recurrence,
    canSave,
    onClose,
    onSave,
    onLabelChange,
    onNotesChange,
    onTimeChange,
    onDateChange,
    onCategoryChange,
    onRecurrenceChange,
  } = model;

  return (
    <BottomSheetDialog open={open} title="New Task" onClose={onClose}>
      <ModalForm onSubmit={onSave}>
        <div className="flex flex-col space-y-2">
          <div>
            <Field id="add-task-date" label="Task date" type="date" value={date} onChange={(e) => onDateChange(e.target.value)} />
          </div>
          <div>
            <Field id="add-task-time" label="Task time" type="time" value={time} onChange={(e) => onTimeChange(e.target.value)} />
          </div>
        </div>
        <Field id="add-task-label" label="Task name" autoFocus placeholder="Task name" value={label} onChange={(e) => onLabelChange(e.target.value)} />
        <Field id="add-task-notes" label="Notes" placeholder="Notes (optional)" value={notes} onChange={(e) => onNotesChange(e.target.value)} />
        <SelectField id="add-task-category" label="Category" value={category} onChange={(e) => onCategoryChange(e.target.value as TaskCategory)} placeholder={!category}>
          <option value="" disabled>Category</option>
          {taskCategories.map((item) => <option key={item}>{item}</option>)}
        </SelectField>
        <SelectField id="add-task-recurrence" label="Recurrence" value={recurrence} onChange={(e) => onRecurrenceChange(e.target.value as TaskRecurrence)} placeholder={!recurrence}>
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
