import clsx from "clsx";
import { motion } from "framer-motion";

import ListItem from "@/components/ListItem";
import { formatTaskDateTime } from "@/shared/lib/date";
import { isTaskCompletedOn } from "@/features/tasks/selectors/taskSelectors";

import type { Task, EntityId } from "@/features/tasks/types";
import type { DateKey } from "@/shared/lib/date";

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
    <motion.div
      layout
      initial={false}
      animate={{
        opacity: done ? 0.6 : 1,
        scale: done ? 0.98 : 1,
      }}
      transition={{ duration: 0.2 }}
      className={clsx(
        "transition-all",
        done && "opacity-60"
      )}
    >
      <ListItem
        label={
          <span className={clsx(done && "line-through")}>
            {task.label}
          </span>
        }
        subtitle={subtitle}
        category={task.category}
        checked={done}
        onToggle={() => onToggleTask(task.id, activeDate)}
        onClick={() => onSelectTask(task)}
      />
    </motion.div>
  );
};