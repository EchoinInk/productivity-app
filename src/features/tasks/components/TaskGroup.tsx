import { memo } from "react";

import { TaskRow } from "@/features/tasks/components/TaskRow";
import { TaskGroupUI } from "@/features/tasks/components/ui/TaskGroupUI";
import type { TaskRowVM } from "@/features/tasks/view-models/useTasksViewModel";

type TaskGroupProps = {
  title: string;
  tasks: TaskRowVM[];
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
          onToggleTask={onToggleTask}
          onSelectTask={onSelectTask}
        />
      ))}
    </TaskGroupUI>
  ),
);

TaskGroup.displayName = "TaskGroup";
