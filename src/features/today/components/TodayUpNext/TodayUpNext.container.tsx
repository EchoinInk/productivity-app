import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { TodayUpNextView } from "./TodayUpNext.view";
import { getToday } from "@/shared/lib/date";
import { useMemo } from "react";

export const TodayUpNextContainer = ({ onLogMeal }: { onLogMeal?: () => void } = {}) => {
  const tasks = useTasksStore((state) => state.tasks);
  const toggleTask = useTasksStore((state) => state.toggleTask);

  // Get first incomplete task sorted by date
  const items = useMemo(() => {
    const today = getToday() || new Date().toISOString().split("T")[0]!;
    const incompleteTasks = tasks
      .filter(task => !task.completed)
      .sort((a, b) => a.date.localeCompare(b.date));
    
    const firstTask = incompleteTasks[0];
    
    if (!firstTask) {
      return [];
    }
    
    return [{
      id: firstTask.id,
      type: "task" as const,
      title: firstTask.label,
      time: firstTask.time,
      completed: false,
      onToggle: () => toggleTask(firstTask.id)
    }];
  }, [tasks, toggleTask]);

  const viewModel = useMemo(() => ({
    items,
    hasItems: items.length > 0
  }), [items]);

  return <TodayUpNextView model={viewModel} />;
};
