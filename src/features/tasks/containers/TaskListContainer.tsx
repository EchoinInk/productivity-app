import { useState, useCallback } from "react";

import { UIText } from "@/components/ui/Text";

import { TaskSection } from "@/features/tasks/components/TaskSection";
import {
  useTasks,
  type TaskSectionType,
} from "@/features/tasks/hooks/useTasks";

interface TaskListContainerProps {
  onSelectTask: (id: string) => void;
}

/**
 * Container — wires the unified `useTasks` hook to the
 * presentational sections. Holds only UI-only state
 * (which sections are open).
 */
export const TaskListContainer = ({
  onSelectTask,
}: TaskListContainerProps) => {
  const { activeDate, sections, actions } = useTasks();

  const [openSections, setOpenSections] = useState<Record<TaskSectionType, boolean>>({
    today: true,
    upcoming: false,
    yesterday: false,
  });

  const toggleSection = useCallback((key: TaskSectionType) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleToggleTask = useCallback((id: string) => {
    actions.toggleTask(id, activeDate);
  }, [actions, activeDate]);

  const handleSelectTask = useCallback((id: string) => {
    onSelectTask(id);
  }, [onSelectTask]);

  const isEmpty = sections.every((section) => section.tasks.length === 0);

  if (isEmpty) {
    return (
      <div className="py-10 text-center space-y-2">
        <UIText.Body className="font-medium">No tasks yet</UIText.Body>
        <UIText.Meta>Add your first task to get started</UIText.Meta>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <TaskSection
        sections={sections}
        expandedSections={openSections}
        onToggleSection={toggleSection}
        onToggleTask={handleToggleTask}
        onSelectTask={handleSelectTask}
      />
    </div>
  );
};
