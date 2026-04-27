import { useMemo } from "react";

import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import {
  getTaskProgress,
  selectTasks,
  type TaskProgress,
} from "@/features/tasks/api";
import { getToday, type DateKey } from "@/shared/lib/date";

/**
 * Memoized task-progress hook.
 *
 * Subscribes only to the raw tasks list and derives progress via `useMemo`,
 * so consumers re-render only when `tasks` or `date` actually change.
 *
 * Prefer `useTasks(date).progress` in new code.
 */
export const useTaskProgress = (
  date: DateKey = getToday(),
): TaskProgress => {
  const tasks = useTasksStore(selectTasks);
  return useMemo(() => getTaskProgress(tasks, date), [tasks, date]);
};
