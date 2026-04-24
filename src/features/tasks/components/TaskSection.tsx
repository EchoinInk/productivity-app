import clsx from "clsx";
import { ChevronDown } from "lucide-react";

import { TaskRow } from "./TaskRow";
import { UIText } from "@/components/ui/Text";

import { getTaskProgress } from "@/features/tasks/api"; // ✅ FIXED

import type { EntityId, Task } from "@/features/tasks/types";
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

const EMPTY_MESSAGES: Record<string, string> = {
  Today: "No tasks for today",
  Upcoming: "Nothing coming up",
  Yesterday: "No tasks from yesterday",
};

const EMPTY_HINTS: Record<string, string> = {
  Today: "Add a task to get started",
};

/**
 * Presentational section.
 * Uses domain for all derived data.
 */
export const TaskSection = ({
  title,
  isOpen,
  onToggle,
  tasks,
  activeDate,
  onToggleTask,
  onSelectTask,
}: TaskSectionProps) => {
  const progress = getTaskProgress(tasks, activeDate); // ✅ FIXED

  return (
    <section
      className="
        rounded-xl
        bg-white/60
        backdrop-blur-md
        border border-white/40
        px-3 py-2
        space-y-2
      "
    >
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-1"
      >
        <div className="flex items-center gap-2">
          <UIText.Title>
            {title}
          </UIText.Title>

          <UIText.Meta>
            {progress.completed}/{progress.total}
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
          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      {isOpen && (
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <div className="py-4 px-2 space-y-1">
              <UIText.Section>
                {EMPTY_MESSAGES[title] ?? "No tasks"}
              </UIText.Section>

              <UIText.Micro>
                {EMPTY_HINTS[title] ?? "Nothing scheduled here"}
              </UIText.Micro>
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
