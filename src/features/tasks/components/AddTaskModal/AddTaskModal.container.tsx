import { useState } from "react";
import { AddTaskModalView } from "./AddTaskModal.view";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import type {
  TaskCategory,
  TaskPriority,
  TaskRecurrence,
} from "@/features/tasks/types/types";

type Props = {
  open: boolean;
  onClose: () => void;
  defaultDate: string;
};

export const AddTaskModal = ({ open, onClose, defaultDate }: Props) => {
  const addTask = useTasksStore((s) => s.addTask);

  const [label, setLabel] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [category, setCategory] = useState<TaskCategory | "">("");
  const [priority, setPriority] = useState<TaskPriority | "">("");
  const [recurrence, setRecurrence] = useState<TaskRecurrence | "">("");
  const [loading, setLoading] = useState(false);

  const canSave = label.trim().length > 0;

  const reset = () => {
    setLabel("");
    setNotes("");
    setDate(defaultDate);
    setCategory("");
    setPriority("");
    setRecurrence("");
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault(); // 🔴 CRITICAL FIX

    if (!canSave || loading) return;

    setLoading(true);

    try {
      addTask({
        label: label.trim(),
        date,
        notes: notes.trim() || undefined,
        category: category || undefined,
        priority: priority || undefined,
        recurrence: recurrence || undefined,
      });

      handleClose(); // 🔴 CLOSE MODAL AFTER SAVE
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddTaskModalView
      model={{
        open,
        label,
        notes,
        date,
        category,
        priority,
        recurrence,
        canSave,
        loading,
        onClose: handleClose,
        onSave: handleSave,
        onLabelChange: setLabel,
        onNotesChange: setNotes,
        onDateChange: setDate,
        onCategoryChange: setCategory,
        onPriorityChange: setPriority,
        onRecurrenceChange: setRecurrence,
      }}
    />
  );
};