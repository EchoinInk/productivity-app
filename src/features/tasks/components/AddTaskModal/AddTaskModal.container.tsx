import { AddTaskModalView, type AddTaskModalViewModel } from "./AddTaskModal.view";
import { useAddTaskForm } from "../../hooks/useAddTaskForm";
import type { TaskCategory, TaskRecurrence } from "@/features/tasks/types/types";

interface AddTaskProps {
  open: boolean;
  onClose: () => void;
  defaultDate: string;
  onSave: (task: { label: string; date: string; time?: string; recurrence?: TaskRecurrence; category?: TaskCategory; notes?: string }) => void;
}

export const AddTaskModal = ({ open, onClose, onSave, defaultDate }: AddTaskProps) => {
  const form = useAddTaskForm({ open, defaultDate, onSave, onClose });

  const model: AddTaskModalViewModel = {
    open,
    onClose,
    ...form,
  };

  return (
    <AddTaskModalView model={model} />
  );
};
