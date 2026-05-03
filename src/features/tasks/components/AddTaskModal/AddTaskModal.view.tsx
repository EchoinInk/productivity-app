import { useState, useMemo, useCallback } from "react";
import { AddTaskModalView } from "./AddTaskModal.view";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import type { CreateTaskInput } from "@/features/tasks/types/types";

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
  const [category, setCategory] = useState<"" | any>("");
  const [recurrence, setRecurrence] = useState<"" | any>("");
  const [priority, setPriority] = useState<"" | any>("");

  const [loading, setLoading] = useState(false);

  const reset = useCallback(() => {
    setLabel("");
    setNotes("");
    setDate(defaultDate);
    setCategory("");
    setRecurrence("");
    setPriority("");
  }, [defaultDate]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!label.trim() || loading) return;

      setLoading(true);

      const payload: CreateTaskInput = {
        label: label.trim(),
        notes: notes || undefined,
        date,
        category: category || undefined,
        recurrence: recurrence || undefined,
        priority: priority || undefined,
      };

      addTask(payload);

      handleClose();
      setLoading(false);
    },
    [label, notes, date, category, recurrence, priority, loading, addTask, handleClose],
  );

  const canSave = label.trim().length > 0;

  // 🔥 THIS FIXES YOUR INPUT BUG
  const model = useMemo(
    () => ({
      open,
      label,
      notes,
      date,
      category,
      recurrence,
      priority,
      canSave,
      loading,
      onClose: handleClose,
      onSave: handleSubmit,
      onLabelChange: setLabel,
      onNotesChange: setNotes,
      onDateChange: setDate,
      onCategoryChange: setCategory,
      onRecurrenceChange: setRecurrence,
      onPriorityChange: setPriority,
    }),
    [open, label, notes, date, category, recurrence, priority, canSave, loading, handleClose, handleSubmit],
  );

  return <AddTaskModalView model={model} />;
};
