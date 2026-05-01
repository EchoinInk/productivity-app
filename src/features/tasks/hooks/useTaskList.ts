import { useState, useCallback } from "react";
import { useTasks } from "./useTasks";

type SectionType = "today" | "upcoming" | "completed";

interface UseTaskListProps {
  onSelectTask: (id: string) => void;
}

export const useTaskList = ({ onSelectTask }: UseTaskListProps) => {
  const { sections, actions } = useTasks();

  const [openSections, setOpenSections] = useState<Record<SectionType, boolean>>({
    today: true,
    upcoming: false,
    completed: false,
  });

  const toggleSection = useCallback((key: SectionType) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleToggleTask = useCallback(
    (id: string) => {
      actions.toggleTask(id);
    },
    [actions],
  );

  const handleSelectTask = useCallback(
    (id: string) => {
      onSelectTask(id);
    },
    [onSelectTask],
  );

  const isEmpty = sections.today.length === 0 && sections.upcoming.length === 0 && sections.completed.length === 0;

  return {
    sections,
    openSections,
    toggleSection,
    handleToggleTask,
    handleSelectTask,
    isEmpty,
  };
};
