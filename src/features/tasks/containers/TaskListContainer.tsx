import { useState } from "react";

import { UIText } from "@/components/ui/Text";

import { TaskSection } from "@/features/tasks/components/TaskSection";
import { useTasks } from "@/features/tasks/hooks/useTasks";

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
  const { activeDate, groups, actions } = useTasks();

  const [openSections, setOpenSections] = useState({
    today: true,
    upcoming: false,
    yesterday: false,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isEmpty =
    groups.today.length === 0 &&
    groups.upcoming.length === 0 &&
    groups.yesterday.length === 0;

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
        title="Today"
        isOpen={openSections.today}
        onToggle={() => toggleSection("today")}
        tasks={groups.today}
        activeDate={activeDate}
        onToggleTask={actions.toggleTask}
        onSelectTask={onSelectTask}
      />

      <TaskSection
        title="Upcoming"
        isOpen={openSections.upcoming}
        onToggle={() => toggleSection("upcoming")}
        tasks={groups.upcoming}
        activeDate={activeDate}
        onToggleTask={actions.toggleTask}
        onSelectTask={onSelectTask}
      />

      <TaskSection
        title="Yesterday"
        isOpen={openSections.yesterday}
        onToggle={() => toggleSection("yesterday")}
        tasks={groups.yesterday}
        activeDate={activeDate}
        onToggleTask={actions.toggleTask}
        onSelectTask={onSelectTask}
      />
    </div>
  );
};
