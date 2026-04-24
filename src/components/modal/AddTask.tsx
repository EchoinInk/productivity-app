import { useEffect, useState } from "react";
import clsx from "clsx";
import { BottomSheetDialog } from "@/components/ui/BottomSheetDialog";
import { FormActions } from "@/components/ui/FormActions";
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
      <form
        className="space-y-4"
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
            <label htmlFor="add-task-date" className="sr-only">Task date</label>
            <input id="add-task-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
          <div className="flex-1">
            <label htmlFor="add-task-time" className="sr-only">Task time</label>
            <input id="add-task-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          </div>
        </div>
        <label htmlFor="add-task-label" className="sr-only">Task name</label>
        <input id="add-task-label" autoFocus placeholder="Task name" value={label} onChange={(e) => setLabel(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <label htmlFor="add-task-notes" className="sr-only">Notes</label>
        <input id="add-task-notes" placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <label htmlFor="add-task-category" className="sr-only">Category</label>
        <select id="add-task-category" value={category} onChange={(e) => setCategory(e.target.value as TaskCategory)} className={clsx("w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", !category && "text-muted-foreground")}>
          <option value="" disabled>Category</option>
          {taskCategories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <label htmlFor="add-task-recurrence" className="sr-only">Recurrence</label>
        <select id="add-task-recurrence" value={recurrence} onChange={(e) => setRecurrence(e.target.value as TaskRecurrence)} className={clsx("w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", !recurrence && "text-muted-foreground")}>
          <option value="" disabled>Recurring</option>
          <option value="none">None</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <FormActions onCancel={onClose} disabled={!canSave} />
      </form>
    </BottomSheetDialog>
  );
};

export default AddTask;
