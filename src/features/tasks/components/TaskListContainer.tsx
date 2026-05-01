import { Body, Meta } from "@/components/ui/Text";

import { TaskSection } from "@/features/tasks/components/TaskSection";
import { useTaskList } from "@/features/tasks/hooks/useTaskList";

interface TaskListContainerProps {
  onSelectTask: (id: string) => void;
}

/**
 * Container — wires the unified `useTaskList` hook to the
 * presentational sections. Holds only UI-only state
 * (which sections are open).
 */
export const TaskListContainer = ({
  onSelectTask,
}: TaskListContainerProps) => {
  const {
    sections,
    openSections,
    toggleSection,
    handleToggleTask,
    handleSelectTask,
    isEmpty,
  } = useTaskList({ onSelectTask });

  if (isEmpty) {
    return (
      <div className="py-10 text-center space-y-2">
        <Body className="font-medium">No tasks yet 🎉</Body>
        <Meta>Add your first task to get started</Meta>
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
