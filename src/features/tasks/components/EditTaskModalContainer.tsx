import { EditTaskModalView } from "./EditTaskModalView";
import { useEditTaskForm } from "../hooks/useEditTaskForm";
import type { Task } from "@/features/tasks/types/types";

interface Props {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (updated: Task) => void;
  onDelete: () => void;
}

export const EditTask = ({ open, onClose, task, onSave, onDelete }: Props) => {
  const form = useEditTaskForm({ open, task, onSave });

  if (!task) return null;

  return (
    <EditTaskModalView
      open={open}
      onClose={onClose}
      onDelete={onDelete}
      {...form}
    />
  );
};

export default EditTask;
