import { useMemo } from "react";
import { useTasksStore } from "../store/useTasksStore";
import {
  getTaskProgress,
  getTodayCategorySummaries,
} from "../selectors/taskSelectors";

export const useTasksView = (date: string) => {
  const tasks = useTasksStore((s) => s.tasks);
  const toggleTask = useTasksStore((s) => s.toggleTask);

  const progress = useMemo(
    () => getTaskProgress(tasks, date),
    [tasks, date]
  );

  const categorySummary = useMemo(
    () => getTodayCategorySummaries(tasks, date),
    [tasks, date]
  );

  return {
    progress,
    categorySummary,
    toggleTask,
  };
};