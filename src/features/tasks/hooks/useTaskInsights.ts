import { useMemo } from "react";

import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import {
  getActiveCategorySummaries,
  getCategorySummaries,
  selectTasks,
  type CategorySummary,
} from "@/features/tasks/api";

import { getToday, type DateKey } from "@/shared/lib/date";

export interface TaskInsights {
  summaries: CategorySummary[];
  active: CategorySummary[];
  hasInsights: boolean;
}

/**
 * Memoized category-summary hook.
 *
 * Prefer `useTasks(date).insights` in new code.
 */
export const useTaskInsights = (
  date: DateKey = getToday(),
): TaskInsights => {
  const tasks = useTasksStore(selectTasks);

  const summaries = useMemo(
    () => getCategorySummaries(tasks, date),
    [tasks, date],
  );

  const active = useMemo(
    () => getActiveCategorySummaries(summaries),
    [summaries],
  );

  return useMemo(
    () => ({ summaries, active, hasInsights: active.length > 0 }),
    [summaries, active],
  );
};
