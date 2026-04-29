import { useEffect, useState } from "react";
import { AddTaskModalView } from "./AddTaskModalView";
import type { TaskCategory, TaskRecurrence } from "@/features/tasks/types/types";

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSave) return;
    onSave({ label: label.trim(), date, time: time || undefined, category: category || undefined, recurrence: recurrence || undefined, notes: notes || undefined });
    reset();
    onClose();
  };

  return (
    <AddTaskModalView
      open={open}
      label={label}
      notes={notes}
      time={time}
      date={date}
      category={category}
      recurrence={recurrence}
      canSave={canSave}
      onClose={onClose}
      onSave={handleSubmit}
      onLabelChange={setLabel}
      onNotesChange={setNotes}
      onTimeChange={setTime}
      onDateChange={setDate}
      onCategoryChange={setCategory}
      onRecurrenceChange={setRecurrence}
    />
  );
};

export default AddTask;
