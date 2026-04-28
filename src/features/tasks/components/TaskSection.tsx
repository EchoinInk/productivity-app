import clsx from "clsx";
import { ChevronDown } from "lucide-react";

import { TaskGroup } from "@/features/tasks/components/TaskGroup";
import { UIText } from "@/components/ui/Text";
import type {
  TaskSection as TaskSectionVM,
  TaskSectionType,
} from "@/features/tasks/hooks/useTasks";

interface TaskSectionProps {
  sections: TaskSectionVM[];
  expandedSections: Record<TaskSectionType, boolean>;
  onToggleSection: (type: TaskSectionType) => void;
  onToggleTask: (id: string) => void;
  onSelectTask: (id: string) => void;
}

/**
 * Presentational section.
 * Uses domain for all derived data.
 */
export const TaskSection = ({
  sections,
  expandedSections,
  onToggleSection,
  onToggleTask,
  onSelectTask,
}: TaskSectionProps) => {
  return (
    <>
      {sections.map((section) => {
        const isOpen = expandedSections[section.type];

        return (
          <section
            key={section.type}
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
              onClick={() => onToggleSection(section.type)}
              className="flex items-center justify-between w-full py-1"
            >
              <div className="flex items-center gap-2">
                <UIText.HeadingL>
                  {section.title}
                </UIText.HeadingL>

                <UIText.Meta>
                  {section.completed}/{section.total}
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
                style={{ width: `${section.percentage}%` }}
              />
            </div>

            {isOpen && (
              <div className="space-y-2">
                {section.tasks.length === 0 ? (
                  <div className="py-4 px-2 space-y-1">
                    <UIText.HeadingM>{section.emptyMessage}</UIText.HeadingM>
                    <UIText.Micro>{section.emptyHint}</UIText.Micro>
                  </div>
                ) : (
                  <TaskGroup
                    title={section.title}
                    tasks={section.tasks}
                    onToggleTask={onToggleTask}
                    onSelectTask={onSelectTask}
                  />
                )}
              </div>
            )}
          </section>
        );
      })}
    </>
  );
};
