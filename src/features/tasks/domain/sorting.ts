import { isTaskCompletedOn } from "./completion";

import type { Task } from "@/features/tasks/types";
import type { DateKey } from "@/shared/lib/date";

/**
 * ---------------------------------------
 * SORTING DOMAIN
 * ---------------------------------------
 *
 * Single source of truth for ordering tasks:
 *  1. Incomplete tasks before completed
 *  2. Tasks with a time before tasks without
 *  3. Earlier time first
 *  4. Fall back to alphabetical label
 */
export const sortTasksByTime = (
  items: Task[],
  date: DateKey,
): Task[] => {
  return [...items].sort((a, b) => {
    const doneDiff =
      Number(isTaskCompletedOn(a, date)) -
      Number(isTaskCompletedOn(b, date));

    if (doneDiff !== 0) return doneDiff;

    if (!a.time && !b.time) return a.label.localeCompare(b.label);
    if (!a.time) return 1;
    if (!b.time) return -1;

    return a.time.localeCompare(b.time);
  });
};
