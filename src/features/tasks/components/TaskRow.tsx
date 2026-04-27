import { memo } from "react";
import { TaskRowUI } from "@/features/tasks/components/ui/TaskRowUI";
import type { TaskRowVM } from "@/features/tasks/view-models/useTasksViewModel";

type Props = {
  task: TaskRowVM;
  onToggleTask: (id: string) => void;
  onSelectTask: (id: string) => void;
};

export const TaskRow = memo(
  ({ task, onToggleTask, onSelectTask }: Props) => {
    return (
      <TaskRowUI
        id={task.id}
        title={task.title}
        subtitle={task.subtitle}
        isCompleted={task.isCompleted}
        category={task.category}
        onToggleTask={() => onToggleTask(task.id)}
        onSelectTask={() => onSelectTask(task.id)}
      />
    );
  }
);

TaskRow.displayName = "TaskRow";