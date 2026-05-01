import { memo } from "react";
import { TaskRowUI } from "@/features/tasks/components/ui/TaskRowUI";
import type { Task } from "@/features/tasks/types/types";

type Props = {
  task: Task;
  onToggleTask: (id: string) => void;
  onSelectTask: (id: string) => void;
};

export const TaskRow = memo(
  ({ task, onToggleTask, onSelectTask }: Props) => {
    return (
      <TaskRowUI
        id={task.id}
        title={task.label}
        subtitle={task.date}
        isCompleted={task.completed}
        category={task.category}
        time={task.time}
        onToggleTask={() => onToggleTask(task.id)}
        onSelectTask={() => onSelectTask(task.id)}
      />
    );
  }
);

TaskRow.displayName = "TaskRow";