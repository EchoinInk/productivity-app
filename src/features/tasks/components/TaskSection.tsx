import clsx from "clsx";
import { ChevronDown } from "lucide-react";

import { TaskGroup } from "@/features/tasks/components/TaskGroup";
import { Surface } from "@/components/ui/Surface";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { HeroTitle, Meta, Heading } from "@/components/ui/Text";
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
          <Surface
            key={section.type}
            as="section"
            padding="sm"
            className="space-y-2"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-label={`Toggle ${section.title.toLowerCase()} section`}
              onClick={() => onToggleSection(section.type)}
              className="flex items-center justify-between w-full py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              <div className="flex items-center gap-2">
                <HeroTitle>{section.title}</HeroTitle>

                <Meta>
                  {section.completed}/{section.total}
                </Meta>
              </div>

              <ChevronDown
                size={16}
                className={clsx(
                  "transition-transform duration-200 text-muted-foreground",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            <ProgressBar
              value={section.percentage}
              size="sm"
              ariaLabel={`${section.title} progress`}
            />

            {isOpen && (
              <div className="space-y-2">
                {section.tasks.length === 0 ? (
                  <div className="py-4 px-2 space-y-1">
                    <Heading>{section.emptyMessage}</Heading>
                    <Meta>{section.emptyHint}</Meta>
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
          </Surface>
        );
      })}
    </>
  );
};
