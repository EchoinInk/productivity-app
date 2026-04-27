import { useState } from "react";

import { UIText } from "@/components/ui/Text";

import { TaskSection } from "@/features/tasks/components/TaskSection";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useTasksViewModel } from "@/features/tasks/view-models/useTasksViewModel";

import type { Task } from "@/features/tasks/types";

interface TaskListContainerProps {
  onSelectTask: (task: Task) => void;
}

/**
 * Container — wires the unified `useTasks` hook to the
 * presentational sections. Holds only UI-only state
 * (which sections are open).
 */
export const TaskListContainer = ({
  onSelectTask,
}: TaskListContainerProps) => {
  const { actions } = useTasks();
  const { activeDate, sections } = useTasksViewModel();

  const [openSections, setOpenSections] = useState({
    today: true,
    upcoming: false,
    yesterday: false,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isEmpty = sections.every((section) => section.taskIds.length === 0);

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
      {sections.map((section) => (
        <TaskSection
          key={section.key}
          title={section.title}
          isOpen={openSections[section.key]}
          onToggle={() => toggleSection(section.key)}
          taskIds={section.taskIds}
          total={section.total}
          completed={section.completed}
          percentage={section.percentage}
          emptyMessage={section.emptyMessage}
          emptyHint={section.emptyHint}
          activeDate={activeDate}
          onToggleTask={actions.toggleTask}
          onSelectTask={onSelectTask}
        />
      ))}
    </div>
  );
};
