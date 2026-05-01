import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { TodayUpNextView } from "./TodayUpNext.view";
import { useMemo } from "react";
import { selectIncompleteTodayTasks } from "@/features/tasks/selectors/taskSelectors";

export const TodayUpNextContainer = () => {
  const incompleteTasks = useTasksStore((state) => selectIncompleteTodayTasks(state.tasks));
  const toggleTask = useTasksStore((state) => state.toggleTask);

  // Get first incomplete task sorted by date
  const items = useMemo(() => {
    const sortedTasks = incompleteTasks
      .sort((a, b) => a.date.localeCompare(b.date));
    
    const firstTask = sortedTasks[0];
    
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
  }, [incompleteTasks, toggleTask]);

  const viewModel = useMemo(() => ({
    items,
    hasItems: items.length > 0
  }), [items]);

  return <TodayUpNextView model={viewModel} />;
};
