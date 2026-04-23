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
        onToggle={() => onToggleTask(task)}
        onClick={() => onSelectTask(task)}
      />
    </div>
  );
};