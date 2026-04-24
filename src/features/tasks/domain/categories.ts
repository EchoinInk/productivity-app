import { isTaskCompletedOn } from "./completion";

import type { Task } from "@/features/tasks/types";
import type { DateKey } from "@/shared/lib/date";

/**
 * ---------------------------------------
 * CATEGORY SUMMARY DOMAIN
 * ---------------------------------------
 */

export interface CategorySummary {
  category: string;
  active: number;
  total: number;
  completed: number;
}

const isSameDay = (a: string, b: string) =>
  new Date(a).toDateString() === new Date(b).toDateString();

export const getCategorySummaries = (
  tasks: Task[],
  date: DateKey,
): CategorySummary[] => {
  const summaries = new Map<string, CategorySummary>();

  tasks.forEach((task) => {
    if (!isSameDay(task.date, date)) return;

    const category = task.category || "Other";

    const current =
      summaries.get(category) ?? {
        category,
        active: 0,
        total: 0,
        completed: 0,
      };

    const completed = isTaskCompletedOn(task, date);

    current.total += 1;
    current.completed += completed ? 1 : 0;
    current.active += completed ? 0 : 1;

    summaries.set(category, current);
  });

  return [...summaries.values()].sort(
    (a, b) => b.active - a.active,
  );
};
