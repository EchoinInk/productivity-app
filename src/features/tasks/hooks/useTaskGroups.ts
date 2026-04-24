import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import {
  selectTaskGroups,
  type TaskTimelineGroups,
} from "@/features/tasks/api";
import { getToday, type DateKey } from "@/shared/lib/date";

/**
 * Thin shim over the unified `useTasks` selectors,
 * preserved for any call site that only needs groups.
 * Prefer `useTasks(date).groups` in new code.
 */
export const useTaskGroups = (
  date: DateKey = getToday(),
): TaskTimelineGroups => useTasksStore(selectTaskGroups(date));
