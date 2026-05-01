import { useState, useCallback } from "react";
import { useTasks, type TaskSectionType } from "./useTasks";

interface UseTaskListProps {
  onSelectTask: (id: string) => void;
}

export const useTaskList = ({ onSelectTask }: UseTaskListProps) => {
  const { activeDate, sections, actions } = useTasks();

  const [openSections, setOpenSections] = useState<Record<TaskSectionType, boolean>>({
    today: true,
    upcoming: false,
    completed: false,
  });

  const toggleSection = useCallback((key: TaskSectionType) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleToggleTask = useCallback(
    (id: string) => {
      actions.toggleTask(id, activeDate);
    },
    [actions, activeDate],
  );

  const handleSelectTask = useCallback(
    (id: string) => {
      onSelectTask(id);
    },
    [onSelectTask],
  );

  const isEmpty = sections.every((section) => section.tasks.length === 0);

  return {
    sections,
    openSections,
    toggleSection,
    handleToggleTask,
    handleSelectTask,
    isEmpty,
  };
};
