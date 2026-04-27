import clsx from "clsx";
import { ChevronDown } from "lucide-react";

import { TaskGroup } from "@/features/tasks/components/TaskGroup";
import { UIText } from "@/components/ui/Text";

import type { EntityId, Task } from "@/features/tasks/types";
import type { DateKey } from "@/shared/lib/date";

interface TaskSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  taskIds: EntityId[];
  total: number;
  completed: number;
  percentage: number;
  emptyMessage: string;
  emptyHint: string;
  activeDate: DateKey;
  onToggleTask: (id: EntityId, date: DateKey) => void;
  onSelectTask: (task: Task) => void;
}

/**
 * Presentational section.
 * Uses domain for all derived data.
 */
export const TaskSection = ({
  title,
  isOpen,
  onToggle,
  taskIds,
  total,
  completed,
  percentage,
  emptyMessage,
  emptyHint,
  activeDate,
  onToggleTask,
  onSelectTask,
}: TaskSectionProps) => {
  return (
    <section
      className="
        rounded-lg
        bg-white/60
        backdrop-blur-md
        border border-white/40
        px-3 py-2
        space-y-2
      "
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex items-center justify-between w-full py-1"
      >
        <div className="flex items-center gap-2">
          <UIText.HeadingL>
            {title}
          </UIText.HeadingL>

          <UIText.Meta>
            {completed}/{total}
          </UIText.Meta>
        </div>

        <ChevronDown
          size={16}
          className={clsx(
            "transition-transform duration-200 text-muted-foreground",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <div className="h-1 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-foreground transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {isOpen && (
        <div className="space-y-2">
          {taskIds.length === 0 ? (
            <div className="py-4 px-2 space-y-1">
              <UIText.HeadingM>
                {emptyMessage}
              </UIText.HeadingM>

              <UIText.Micro>
                {emptyHint}
              </UIText.Micro>
            </div>
          ) : (
            <TaskGroup
              title={title}
              taskIds={taskIds}
              activeDate={activeDate}
              onToggleTask={onToggleTask}
              onSelectTask={onSelectTask}
            />
          )}
        </div>
      )}
    </section>
  );
};
