import clsx from "clsx";
import { ChevronDown } from "lucide-react";

import { TaskGroup } from "@/features/tasks/components/TaskGroup";
import { Surface } from "@/components/ui/Surface";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { HeroTitle, Meta, Heading } from "@/components/ui/Text";
import type { TaskSections } from "@/features/tasks/hooks/useTasks";

type SectionType = "today" | "upcoming" | "completed";

interface TaskSectionProps {
  sections: TaskSections;
  expandedSections: Record<SectionType, boolean>;
  onToggleSection: (type: SectionType) => void;
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
  const sectionData = [
    {
      type: 'today' as SectionType,
      title: 'Today',
      tasks: sections.today,
      total: sections.today.length,
      completed: sections.today.filter(t => t.completed).length,
      percentage: sections.today.length > 0 ? (sections.today.filter(t => t.completed).length / sections.today.length) * 100 : 0,
      emptyMessage: 'No tasks for today',
      emptyHint: 'Add a task to get started'
    },
    {
      type: 'upcoming' as SectionType,
      title: 'Upcoming',
      tasks: sections.upcoming,
      total: sections.upcoming.length,
      completed: 0,
      percentage: 0,
      emptyMessage: 'No upcoming tasks',
      emptyHint: 'Future tasks will appear here'
    },
    {
      type: 'completed' as SectionType,
      title: 'Completed',
      tasks: sections.completed,
      total: sections.completed.length,
      completed: sections.completed.length,
      percentage: 100,
      emptyMessage: 'No completed tasks',
      emptyHint: 'Completed tasks will appear here'
    }
  ];

  return (
    <>
      {sectionData.map((section) => {
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
