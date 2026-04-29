import { useEffect, useState } from "react";
import { EditTaskModalView } from "./EditTaskModalView";
import type { Task, TaskCategory, TaskRecurrence } from "@/features/tasks/types/types";

interface Props {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (updated: Task) => void;
  onDelete: () => void;
}

export const EditTask = ({ open, onClose, task, onSave, onDelete }: Props) => {
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

  const handleSubmit = (event: React.FormEvent) => {
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
  };

  return (
    <EditTaskModalView
      open={open}
      label={label}
      notes={notes}
      category={category}
      date={date}
      time={time}
      recurrence={recurrence}
      canSave={canSave}
      onClose={onClose}
      onSave={handleSubmit}
      onLabelChange={setLabel}
      onNotesChange={setNotes}
      onCategoryChange={setCategory}
      onDateChange={setDate}
      onTimeChange={setTime}
      onRecurrenceChange={setRecurrence}
      onDelete={onDelete}
    />
  );
};

export default EditTask;
