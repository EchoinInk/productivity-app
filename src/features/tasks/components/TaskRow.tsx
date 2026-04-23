import clsx from "clsx";
import ListItem from "@/components/ListItem";

import { formatTaskDateTime, type DateKey } from "@/shared/lib/date";
import { isTaskCompletedOn } from "@/features/tasks/selectors/taskSelectors";

import type { Task, EntityId } from "@/features/tasks/types";

interface TaskRowProps {
  task: Task;
  activeDate: DateKey;

  onToggleTask: (id: EntityId, date: DateKey) => void;
  onSelectTask: (task: Task) => void;
}

export const TaskRow = ({
  task,
  activeDate,
  onToggleTask,
  onSelectTask,
}: TaskRowProps) => {
  const done = isTaskCompletedOn(task, activeDate);

  const subtitle = [
    task.notes,
    formatTaskDateTime(task.date, task.time),
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <div className={clsx("transition-opacity", done && "opacity-60")}>
      <ListItem
        label={task.label}
        subtitle={subtitle}
        category={task.category}
        checked={done}
        onToggle={() => onToggleTask(task.id, activeDate)}
        onClick={() => onSelectTask(task)}
      />
    </div>
  );
};