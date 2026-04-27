import { memo } from "react";

import { TaskRowUI } from "@/features/tasks/components/ui/TaskRowUI";
import type { TaskRowVM } from "@/features/tasks/view-models/useTasksViewModel";

interface TaskRowProps {
  taskRow: TaskRowVM;
}

export const TaskRow = memo(({ taskRow }: TaskRowProps) => (
  <TaskRowUI
    id={taskRow.id}
    title={taskRow.title}
    subtitle={taskRow.subtitle}
    categoryLabel={taskRow.categoryLabel}
    categoryBackgroundColor={taskRow.categoryBackgroundColor}
    categoryTextColor={taskRow.categoryTextColor}
    titleClassName={taskRow.titleClassName}
    subtitleClassName={taskRow.subtitleClassName}
    categoryBadgeClassName={taskRow.categoryBadgeClassName}
    categoryIndicatorOpacity={taskRow.categoryIndicatorOpacity}
    rowOpacity={taskRow.rowOpacity}
    rowScale={taskRow.rowScale}
    onToggleTask={taskRow.onToggleTask}
    onSelectTask={taskRow.onSelectTask}
  />
));

TaskRow.displayName = "TaskRow";
