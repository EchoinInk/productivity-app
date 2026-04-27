import { useMemo } from "react";

import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import {
  getTaskGroups,
  selectTasks,
  type TaskTimelineGroups,
} from "@/features/tasks/api";
import { getToday, type DateKey } from "@/shared/lib/date";

/**
 * Memoized task-grouping hook.
 *
 * Prefer `useTasks(date).groups` in new code.
 */
export const useTaskGroups = (
  date: DateKey = getToday(),
): TaskTimelineGroups => {
  const tasks = useTasksStore(selectTasks);
  return useMemo(() => getTaskGroups(tasks, date), [tasks, date]);
};
