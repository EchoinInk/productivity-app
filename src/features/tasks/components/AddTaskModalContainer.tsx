import { AddTaskModalView } from "./AddTaskModalView";
import { useAddTaskForm } from "../hooks/useAddTaskForm";
import type { TaskCategory, TaskRecurrence } from "@/features/tasks/types/types";

interface AddTaskProps {
  open: boolean;
  onClose: () => void;
  defaultDate: string;
  onSave: (task: { label: string; date: string; time?: string; recurrence?: TaskRecurrence; category?: TaskCategory; notes?: string }) => void;
}

const AddTask = ({ open, onClose, onSave, defaultDate }: AddTaskProps) => {
  const form = useAddTaskForm({ open, defaultDate, onSave, onClose });

  return (
    <AddTaskModalView
      open={open}
      onClose={onClose}
      {...form}
    />
  );
};

export default AddTask;
