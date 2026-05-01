import { memo } from "react";

import { TaskRow } from "@/features/tasks/components/TaskRow";
import { TaskGroupUI } from "@/features/tasks/components/ui/TaskGroupUI";
import type { Task } from "@/features/tasks/types/types";

type TaskGroupProps = {
  title: string;
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onSelectTask: (id: string) => void;
};

export const TaskGroup = memo(
  ({ title, tasks, onToggleTask, onSelectTask }: TaskGroupProps) => (
    <TaskGroupUI title={title}>
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          onToggleTask={() => onToggleTask(task.id)}
          onSelectTask={() => onSelectTask(task.id)}
        />
      ))}
    </TaskGroupUI>
  ),
);

TaskGroup.displayName = "TaskGroup";
