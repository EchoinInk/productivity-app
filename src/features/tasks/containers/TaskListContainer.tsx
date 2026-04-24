import { useState } from "react";

import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { useTaskGroups } from "@/features/tasks/hooks/useTaskGroups";
import { getToday, type DateKey } from "@/shared/lib/date";

import { TaskSection } from "@/features/tasks/components/TaskSection";
import { UIText } from "@/components/ui/Text";

import type { Task, EntityId } from "@/features/tasks/types";

interface TaskListContainerProps {
  onSelectTask: (task: Task) => void;
}

export const TaskListContainer = ({
  onSelectTask,
}: TaskListContainerProps) => {
  const toggleTask = useTasksStore((s) => s.toggleTask);
  const groups = useTaskGroups();

  const today: DateKey = getToday();

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

  const handleToggleTask = (id: EntityId, date: DateKey) => {
    toggleTask(id, date);
  };

  /**
   * ✅ Global empty state
   */
  const isEmpty =
    groups.today.length === 0 &&
    groups.upcoming.length === 0 &&
    groups.yesterday.length === 0;

  /**
   * ✅ Loading-ready (future-proof)
   */
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="py-6 text-center">
        <UIText.Meta>Loading tasks...</UIText.Meta>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="py-10 text-center space-y-2">
        <UIText.Body className="font-medium">
          No tasks yet
        </UIText.Body>

        <UIText.Meta>
          Add your first task to get started
        </UIText.Meta>
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
        onToggleTask={handleToggleTask}
        onSelectTask={onSelectTask}
      />

      <TaskSection
        title="Upcoming"
        isOpen={openSections.upcoming}
        onToggle={() => toggleSection("upcoming")}
        tasks={groups.upcoming}
        activeDate={today}
        onToggleTask={handleToggleTask}
        onSelectTask={onSelectTask}
      />

      <TaskSection
        title="Yesterday"
        isOpen={openSections.yesterday}
        onToggle={() => toggleSection("yesterday")}
        tasks={groups.yesterday}
        activeDate={today}
        onToggleTask={handleToggleTask}
        onSelectTask={onSelectTask}
      />
    </div>
  );
};