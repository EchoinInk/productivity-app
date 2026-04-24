import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { selectTaskGroups } from "@/features/tasks/selectors/taskSelectors";
import { getToday, type DateKey } from "@/shared/lib/date";

import type { TaskTimelineGroups } from "@/features/tasks/domain";

/**
 * Thin shim over the unified `useTasks` selectors,
 * preserved for any call site that only needs groups.
 * Prefer `useTasks(date).groups` in new code.
 */
export const useTaskGroups = (
  date: DateKey = getToday(),
): TaskTimelineGroups => useTasksStore(selectTaskGroups(date));
