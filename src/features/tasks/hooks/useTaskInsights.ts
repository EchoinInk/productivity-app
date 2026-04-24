import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { selectCategorySummaries } from "@/features/tasks/selectors/taskSelectors";
import { getToday, type DateKey } from "@/shared/lib/date";

import type { CategorySummary } from "@/features/tasks/domain";

export interface TaskInsights {
  summaries: CategorySummary[];
  active: CategorySummary[];
  hasInsights: boolean;
}

/**
 * UI-ready insights hook. Returns category
 * summaries plus the subset still active —
 * components only render the result.
 */
export const useTaskInsights = (
  date: DateKey = getToday(),
): TaskInsights => {
  const summaries = useTasksStore(selectCategorySummaries(date));
  const active = summaries.filter((s) => s.active > 0);

  return {
    summaries,
    active,
    hasInsights: active.length > 0,
  };
};
