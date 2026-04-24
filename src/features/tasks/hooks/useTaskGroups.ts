import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { selectTaskGroups } from "@/features/tasks/selectors/taskSelectors";
import { getToday, type DateKey } from "@/shared/lib/date";

import type { TaskTimelineGroups } from "@/features/tasks/domain";

/**
 * UI-ready timeline grouping for a given date
 * (defaults to today). Pure selector usage —
 * no inline logic, no full-state subscription.
 */
export const useTaskGroups = (
  date: DateKey = getToday(),
): TaskTimelineGroups => useTasksStore(selectTaskGroups(date));
