import React, { useCallback } from "react";
import clsx from "clsx";
import ListItem from "@/components/ListItem";
import { formatTaskDateTime } from "@/shared/lib/date";
import { isTaskCompletedOn } from "@/features/tasks/selectors/taskSelectors";
import type { Task } from "@/features/tasks/types";

interface TaskRowProps {
  task: Task;
  activeDate: string;
  onToggleTask: (task: Task) => void;
  onSelectTask: (task: Task) => void;
}

const TaskRowComponent = ({
  task,
  activeDate,
  onToggleTask,
  onSelectTask,
}: TaskRowProps) => {
  const done = isTaskCompletedOn(task, activeDate);

  const subtitle = [task.notes, formatTaskDateTime(task.date, task.time)]
    .filter(Boolean)
    .join(" • ");

  const handleToggle = useCallback(() => {
    onToggleTask(task);
  }, [onToggleTask, task]);

  const handleClick = useCallback(() => {
    onSelectTask(task);
  }, [onSelectTask, task]);

  return (
    <div className={clsx("transition-opacity", done && "opacity-60")}>
      <ListItem
        label={task.label}
        subtitle={subtitle}
        category={task.category}
        checked={done}
        onToggle={handleToggle}
        onClick={handleClick}
      />
    </div>
  );
};

export const TaskRow = React.memo(TaskRowComponent);