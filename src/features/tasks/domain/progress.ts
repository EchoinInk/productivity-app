import { isTaskCompletedOn } from "./completion";
import { filterTasksByDate } from "./grouping";

import type { Task } from "@/features/tasks/types";
import type { DateKey } from "@/shared/lib/date";

/**
 * ---------------------------------------
 * PROGRESS DOMAIN
 * ---------------------------------------
 */

export interface TaskProgress {
  total: number;
  completed: number;
  percentage: number;
}

export const getTaskProgress = (
  tasks: Task[],
  date: DateKey,
): TaskProgress => {
  const datedTasks = filterTasksByDate(tasks, date);

  const completed = datedTasks.filter((task) =>
    isTaskCompletedOn(task, date),
  ).length;

  const total = datedTasks.length;

  return {
    total,
    completed,
    percentage:
      total === 0 ? 0 : Math.round((completed / total) * 100),
  };
};

/**
 * Compute progress against an already-filtered
 * task list (e.g. inside a TaskSection where
 * tasks belong to a specific bucket).
 */
export const getProgressForTasks = (
  tasks: Task[],
  date: DateKey,
): TaskProgress => {
  const completed = tasks.filter((task) =>
    isTaskCompletedOn(task, date),
  ).length;

  const total = tasks.length;

  return {
    total,
    completed,
    percentage:
      total === 0 ? 0 : Math.round((completed / total) * 100),
  };
};
