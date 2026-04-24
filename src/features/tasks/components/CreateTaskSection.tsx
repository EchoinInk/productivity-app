// /features/tasks/components/TaskSection.tsx

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
  return (
    <div>
      {/* Header */}
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2"
      >
        <span className="text-sm font-semibold">{title}</span>
        <ChevronDown
          className={clsx(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          size={16}
        />
      </button>

      {/* Content */}
      {isOpen && (
        <div className="space-y-1">
          {tasks.length === 0 ? (
            <div className="text-sm text-muted-foreground py-2">
              No tasks
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
    </div>
  );
};
