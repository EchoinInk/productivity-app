import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { selectCategorySummaries } from "@/features/tasks/selectors/taskSelectors";

import { getActiveCategorySummaries } from "@/features/tasks/domain/taskDomain"; // ✅ NEW

import { getToday, type DateKey } from "@/shared/lib/date";

import type { CategorySummary } from "@/features/tasks/domain";

export interface TaskInsights {
  summaries: CategorySummary[];
  active: CategorySummary[];
  hasInsights: boolean;
}

/**
 * Thin shim — prefer `useTasks(date).insights`
 */
export const useTaskInsights = (
  date: DateKey = getToday(),
): TaskInsights => {
  const summaries = useTasksStore(selectCategorySummaries(date));

  // ✅ FIX: no logic in hook
  const active = getActiveCategorySummaries(summaries);

  return {
    summaries,
    active,
    hasInsights: active.length > 0,
  };
};