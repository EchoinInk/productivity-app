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
 * Thin shim — prefer `useTasks(date).insights` in new code.
 * Kept so out-of-feature consumers (e.g. `TodayPage`) don't
 * need to be touched in this scoped refactor.
 */
export const useTaskInsights = (
  date: DateKey = getToday(),
): TaskInsights => {
  const summaries = useTasksStore(selectCategorySummaries(date));
  const active = summaries.filter((s) => s.active > 0);

  return { summaries, active, hasInsights: active.length > 0 };
};
