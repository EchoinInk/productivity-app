import { memo } from "react";

import { TaskRow } from "@/features/tasks/components/TaskRow";
import { TaskGroupUI } from "@/features/tasks/components/ui/TaskGroupUI";
import type { TaskRowVM } from "@/features/tasks/view-models/useTasksViewModel";

type TaskGroupProps = {
  title: string;
  taskRows: TaskRowVM[];
};

export const TaskGroup = memo(
  ({ title, taskRows }: TaskGroupProps) => (
    <TaskGroupUI title={title}>
      {taskRows.map((taskRow) => (
        <TaskRow key={taskRow.id} taskRow={taskRow} />
      ))}
    </TaskGroupUI>
  ),
);

TaskGroup.displayName = "TaskGroup";
