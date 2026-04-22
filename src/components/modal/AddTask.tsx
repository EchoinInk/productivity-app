import { useEffect, useState } from "react";
import clsx from "clsx";
import { BottomSheetDialog } from "@/shared/ui/BottomSheetDialog";
import { FormActions } from "@/shared/ui/FormActions";
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
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="flex-1 w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="flex-1 w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
        <input autoFocus placeholder="Task name" value={label} onChange={(e) => setLabel(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <input placeholder="Notes (optional)" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <select value={category} onChange={(e) => setCategory(e.target.value as TaskCategory)} className={clsx("w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", !category && "text-muted-foreground")}>
          <option value="" disabled>Category</option>
          {taskCategories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={recurrence} onChange={(e) => setRecurrence(e.target.value as TaskRecurrence)} className={clsx("w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", !recurrence && "text-muted-foreground")}>
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
