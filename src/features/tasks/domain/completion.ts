import type { Task } from "@/features/tasks/types";
import type { DateKey } from "@/shared/lib/date";

/**
 * ---------------------------------------
 * COMPLETION DOMAIN
 * ---------------------------------------
 *
 * Pure helpers for reading and mutating
 * the per-day completion state of a task.
 *
 * UI / selectors / store should ALL go
 * through these helpers — never touch
 * `task.completedDates` directly.
 */

export const isTaskCompletedOn = (
  task: Task,
  date: DateKey,
): boolean => task.completedDates?.includes(date) ?? false;

export const checkCompletion = isTaskCompletedOn;

/**
 * Returns a NEW task with the completion
 * state for `date` toggled. Pure — never
 * mutates the input.
 */
export const toggleCompletion = (
  task: Task,
  date: DateKey,
): Task => {
  const completedDates = task.completedDates ?? [];
  const exists = completedDates.includes(date);

  return {
    ...task,
    completedDates: exists
      ? completedDates.filter((d) => d !== date)
      : [...completedDates, date],
  };
};
