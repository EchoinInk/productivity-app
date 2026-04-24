import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { selectTaskProgress } from "@/features/tasks/selectors/taskSelectors";
import { getToday, type DateKey } from "@/shared/lib/date";

import type { TaskProgress } from "@/features/tasks/domain";

/**
 * Progress (total / completed / percentage)
 * for a given date. UI-ready.
 */
export const useTaskProgress = (
  date: DateKey = getToday(),
): TaskProgress => useTasksStore(selectTaskProgress(date));
