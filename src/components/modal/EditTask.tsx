import { useEffect, useState } from "react";
import clsx from "clsx";
import { BottomSheetDialog } from "@/shared/ui/BottomSheetDialog";
import { Button } from "@/shared/ui/Button";
import { FormActions } from "@/shared/ui/FormActions";
import { taskCategories } from "@/features/tasks/constants/categories";
import type { Task, TaskCategory, TaskRecurrence } from "@/store/useAppStore";

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
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          if (!canSave) return;
          onSave({ ...task, label: label.trim(), notes: notes || undefined, date, time: time || undefined, recurrence: recurrence || undefined, category: category || undefined });
        }}
      >
        <input autoFocus value={label} onChange={(e) => setLabel(e.target.value)} onFocus={(e) => e.target.select()} className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-background border border-border text-sm text-foreground resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <div className="flex gap-2">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="flex-1 w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="flex-1 w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </div>
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
        <Button variant="destructive" fullWidth onClick={onDelete}>Delete Task</Button>
      </form>
    </BottomSheetDialog>
  );
};

export default EditTask;
