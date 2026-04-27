import { memo } from "react";

import { TaskRow } from "@/features/tasks/components/TaskRow";
import { TaskGroupUI } from "@/features/tasks/components/ui/TaskGroupUI";

import type { EntityId, Task } from "@/features/tasks/types";
import type { DateKey } from "@/shared/lib/date";

type TaskGroupProps = {
  title: string;
  taskIds: EntityId[];
  activeDate: DateKey;
  onToggleTask: (id: EntityId, date: DateKey) => void;
  onSelectTask: (task: Task) => void;
};

export const TaskGroup = memo(
  ({
    title,
    taskIds,
    activeDate,
    onToggleTask,
    onSelectTask,
  }: TaskGroupProps) => (
    <TaskGroupUI title={title}>
      {taskIds.map((taskId) => (
        <TaskRow
          key={taskId}
          taskId={taskId}
          activeDate={activeDate}
          onToggleTask={onToggleTask}
          onSelectTask={onSelectTask}
        />
      ))}
    </TaskGroupUI>
  ),
);

TaskGroup.displayName = "TaskGroup";
