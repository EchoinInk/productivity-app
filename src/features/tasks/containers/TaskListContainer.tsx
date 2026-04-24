import { useState } from "react";

import { UIText } from "@/components/ui/Text";

import { TaskSection } from "@/features/tasks/components/TaskSection";
import { useTaskGroups } from "@/features/tasks/hooks/useTaskGroups";
import { useTaskActions } from "@/features/tasks/hooks/useTaskActions";
import { getToday, type DateKey } from "@/shared/lib/date";

import type { Task } from "@/features/tasks/types";

interface TaskListContainerProps {
  onSelectTask: (task: Task) => void;
}

/**
 * Container — wires hooks to presentational
 * sections. Holds only UI-only state
 * (which sections are open).
 */
export const TaskListContainer = ({
  onSelectTask,
}: TaskListContainerProps) => {
  const today: DateKey = getToday();
  const groups = useTaskGroups(today);
  const { toggleTask } = useTaskActions();

  const [openSections, setOpenSections] = useState({
    today: true,
    upcoming: false,
    yesterday: false,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
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
        activeDate={today}
        onToggleTask={toggleTask}
        onSelectTask={onSelectTask}
      />

      <TaskSection
        title="Upcoming"
        isOpen={openSections.upcoming}
        onToggle={() => toggleSection("upcoming")}
        tasks={groups.upcoming}
        activeDate={today}
        onToggleTask={toggleTask}
        onSelectTask={onSelectTask}
      />

      <TaskSection
        title="Yesterday"
        isOpen={openSections.yesterday}
        onToggle={() => toggleSection("yesterday")}
        tasks={groups.yesterday}
        activeDate={today}
        onToggleTask={toggleTask}
        onSelectTask={onSelectTask}
      />
    </div>
  );
};
