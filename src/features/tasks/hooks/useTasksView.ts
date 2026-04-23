import { useMemo, useCallback } from "react";
import { useTasksStore } from "../store/useTasksStore";
import {
  getTaskTimelineGroups,
  getTaskProgress,
  getTodayCategorySummaries,
} from "../selectors/taskSelectors";
import { getToday, type DateKey } from "@/shared/lib/date";
import type { Task } from "../types";

export const useTasksView = (date?: DateKey) => {
  const tasks = useTasksStore((s) => s.tasks);
  const toggleTaskRaw = useTasksStore((s) => s.toggleTask);

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

  // ✅ ADAPTER (THIS FIXES YOUR ERROR)
  const toggleTask = useCallback(
    (task: Task) => {
      toggleTaskRaw(task.id, activeDate);
    },
    [toggleTaskRaw, activeDate]
  );

  return {
    activeDate,
    timeline,
    progress,
    categories,
    toggleTask, // ✅ now matches UI signature
  };
};