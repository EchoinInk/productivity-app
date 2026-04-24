import { useEffect, useState } from "react";
import clsx from "clsx";
import { BottomSheetDialog } from "@/components/ui/BottomSheetDialog";
import { Button } from "@/components/ui/Button";
import { FormActions } from "@/components/ui/FormActions";
import { taskCategories } from "@/features/tasks/constants/categories";
import type { Task, TaskCategory, TaskRecurrence } from "@/features/tasks/types";

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
        <label htmlFor="edit-task-label" className="sr-only">Task name</label>
        <input
          id="edit-task-label"
          autoFocus
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onFocus={(e) => e.target.select()}
          className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <label htmlFor="edit-task-notes" className="sr-only">Notes</label>
        <textarea
          id="edit-task-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-background border border-border text-sm text-foreground resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <div className="flex gap-2">
          <div className="flex-1">
            <label htmlFor="edit-task-date" className="sr-only">Task date</label>
            <input
              id="edit-task-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="edit-task-time" className="sr-only">Task time</label>
            <input
              id="edit-task-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
        <label htmlFor="edit-task-category" className="sr-only">Category</label>
        <select
          id="edit-task-category"
          value={category}
          onChange={(e) => setCategory(e.target.value as TaskCategory)}
          className={clsx(
            "w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            !category && "text-muted-foreground",
          )}
        >
          <option value="" disabled>
            Category
          </option>
          {taskCategories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <label htmlFor="edit-task-recurrence" className="sr-only">Recurrence</label>
        <select
          id="edit-task-recurrence"
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value as TaskRecurrence)}
          className={clsx(
            "w-full h-11 px-3 rounded-xl bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            !recurrence && "text-muted-foreground",
          )}
        >
          <option value="" disabled>
            Recurring
          </option>
          <option value="none">None</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <FormActions onCancel={onClose} disabled={!canSave} />
        <Button variant="recall" fullWidth onClick={onDelete}>
          Delete Task
        </Button>
      </form>
    </BottomSheetDialog>
  );
};

export default EditTask;
