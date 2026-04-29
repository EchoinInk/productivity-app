import { useEffect, useState } from "react";
import type { TaskCategory, TaskRecurrence } from "../types/types";

interface UseAddTaskFormProps {
  open: boolean;
  defaultDate: string;
  onSave: (task: {
    label: string;
    date: string;
    time?: string;
    recurrence?: TaskRecurrence;
    category?: TaskCategory;
    notes?: string;
  }) => void;
  onClose: () => void;
}

export const useAddTaskForm = ({
  open,
  defaultDate,
  onSave,
  onClose,
}: UseAddTaskFormProps) => {
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSave) return;
    onSave({
      label: label.trim(),
      date,
      time: time || undefined,
      category: category || undefined,
      recurrence: recurrence || undefined,
      notes: notes || undefined,
    });
    reset();
    onClose();
  };

  return {
    label,
    notes,
    time,
    date,
    category,
    recurrence,
    canSave,
    onLabelChange: setLabel,
    onNotesChange: setNotes,
    onTimeChange: setTime,
    onDateChange: setDate,
    onCategoryChange: setCategory,
    onRecurrenceChange: setRecurrence,
    onSave: handleSubmit,
  };
};
