import { memo } from "react";

import { getCategoryMetadata } from "@/features/tasks/constants/categories";
import { isTaskCompleted } from "@/features/tasks/api";
import { buildTaskSubtitle } from "@/shared/lib/taskFormat";
import { TaskRowUI } from "@/features/tasks/components/ui/TaskRowUI";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";

import type { EntityId, Task } from "@/features/tasks/types";
import type { DateKey } from "@/shared/lib/date";

interface TaskRowProps {
  taskId: EntityId;
  activeDate: DateKey;
  onToggleTask: (id: EntityId, date: DateKey) => void;
  onSelectTask: (task: Task) => void;
}

export const TaskRow = memo(
  ({ taskId, activeDate, onToggleTask, onSelectTask }: TaskRowProps) => {
    const task = useTasksStore((state) =>
      state.tasks.find((item) => item.id === taskId),
    );

    if (!task) {
      return null;
    }

    const isCompleted = isTaskCompleted(task, activeDate);
    const categoryStyle = getCategoryMetadata(task.category);
    const subtitle = buildTaskSubtitle(task);
    const titleClassName = isCompleted
      ? "font-medium transition-all opacity-50 line-through"
      : "font-medium transition-all";
    const subtitleClassName = subtitle
      ? "text-muted-foreground"
      : "text-muted-foreground hidden";
    const categoryBadgeClassName = task.category
      ? "inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium"
      : "inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium hidden";
    const categoryIndicatorOpacity = task.category ? 1 : 0;
    const rowOpacity = isCompleted ? 0.6 : 1;
    const rowScale = isCompleted ? 0.98 : 1;

    return (
      <TaskRowUI
        id={String(taskId)}
        title={task.label}
        subtitle={subtitle}
        categoryLabel={task.category ?? ""}
        categoryBackgroundColor={categoryStyle.bg}
        categoryTextColor={categoryStyle.text}
        titleClassName={titleClassName}
        subtitleClassName={subtitleClassName}
        categoryBadgeClassName={categoryBadgeClassName}
        categoryIndicatorOpacity={categoryIndicatorOpacity}
        rowOpacity={rowOpacity}
        rowScale={rowScale}
        onToggleTask={() => onToggleTask(taskId, activeDate)}
        onSelectTask={() => onSelectTask(task)}
      />
    );
  },
);

TaskRow.displayName = "TaskRow";
