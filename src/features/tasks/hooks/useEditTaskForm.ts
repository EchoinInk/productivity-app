import { useEffect, useState } from "react";
import type { Task, TaskCategory, TaskRecurrence } from "../types/types";

interface UseEditTaskFormProps {
  open: boolean;
  task: Task | null;
  onSave: (updated: Task) => void;
}

export const useEditTaskForm = ({
  open,
  task,
  onSave,
}: UseEditTaskFormProps) => {
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
    setCategory(task.category as TaskCategory | "");
    setDate(task.date);
    setTime(task.time ?? "");
    setRecurrence(task.recurrence as TaskRecurrence | "");
  }, [open, task]);

  const canSave = label.trim().length > 0;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSave || !task) return;
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

  return {
    label,
    notes,
    category,
    date,
    time,
    recurrence,
    canSave,
    onLabelChange: setLabel,
    onNotesChange: setNotes,
    onCategoryChange: setCategory,
    onDateChange: setDate,
    onTimeChange: setTime,
    onRecurrenceChange: setRecurrence,
    onSave: handleSubmit,
  };
};
