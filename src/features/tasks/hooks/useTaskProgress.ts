import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import {
  selectTaskProgress,
  type TaskProgress,
} from "@/features/tasks/api";
import { getToday, type DateKey } from "@/shared/lib/date";

/**
 * Thin shim — prefer `useTasks(date).progress` in new code.
 * Kept so out-of-feature consumers (e.g. `TodayPage`) don't
 * need to be touched in this scoped refactor.
 */
export const useTaskProgress = (
  date: DateKey = getToday(),
): TaskProgress => useTasksStore(selectTaskProgress(date));
