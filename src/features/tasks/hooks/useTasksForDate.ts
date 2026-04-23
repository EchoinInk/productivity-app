import { useMemo } from "react";
import { useTasksStore } from "../store/useTasksStore";
import {
  getTaskTimelineGroups,
  getTaskProgress,
  getTodayCategorySummaries,
} from "../selectors/taskSelectors";
import { getToday, type DateKey } from "@/shared/lib/date";

export const useTasksForDate = (date?: DateKey) => {
  const tasks = useTasksStore((s) => s.tasks);
  const toggleTask = useTasksStore((s) => s.toggleTask);

  const activeDate = date ?? getToday();

  const timeline = useMemo(
    () => getTaskTimelineGroups(tasks, activeDate),
    [tasks, activeDate]
  );

  const progress = useMemo(
    () => getTaskProgress(tasks, activeDate),
    [tasks, activeDate]
  );

  const categories = useMemo(
    () => getTodayCategorySummaries(tasks, activeDate),
    [tasks, activeDate]
  );

  return {
    activeDate,
    timeline,
    progress,
    categories,
    toggleTask,
  };
};