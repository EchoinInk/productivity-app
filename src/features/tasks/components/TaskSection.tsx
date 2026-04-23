import clsx from "clsx";
import { ChevronDown } from "lucide-react";

import { TaskRow } from "./TaskRow";

import type { Task, EntityId } from "@/features/tasks/types";
import type { DateKey } from "@/shared/lib/date";

interface TaskSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;

  tasks: Task[];
  activeDate: DateKey;

  onToggleTask: (id: EntityId, date: DateKey) => void;
  onSelectTask: (task: Task) => void;
}

export const TaskSection = ({
  title,
  isOpen,
  onToggle,
  tasks,
  activeDate,
  onToggleTask,
  onSelectTask,
}: TaskSectionProps) => {
  const getEmptyMessage = () => {
    switch (title) {
      case "Today":
        return "No tasks for today";
      case "Upcoming":
        return "Nothing coming up";
      case "Yesterday":
        return "No tasks from yesterday";
      default:
        return "No tasks";
    }
  };

  return (
    <section className="space-y-2">
      {/* HEADER */}
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2"
      >
        <span className="text-sm font-semibold">{title}</span>

        <ChevronDown
          size={16}
          className={clsx(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* CONTENT */}
      {isOpen && (
        <div className="space-y-1">
          {tasks.length === 0 ? (
            <div className="py-4 px-2 text-sm text-muted-foreground">
              {getEmptyMessage()}
            </div>
          ) : (
            tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                activeDate={activeDate}
                onToggleTask={onToggleTask}
                onSelectTask={onSelectTask}
              />
            ))
          )}
        </div>
      )}
    </section>
  );
};