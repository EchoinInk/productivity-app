import { getToday } from "@/shared/lib/date";

import {
  getCategorySummaries,
  getTaskProgress as getTaskProgressDomain,
  getTaskTimelineGroups as getTaskTimelineGroupsDomain,
  isTaskCompletedOn,
  memoOne,
  sortTasksByTime,
  filterTasksByDate,
  filterTasksAfterDate,
  filterTasksBeforeDate,
  type CategorySummary,
  type TaskProgress,
  type TaskTimelineGroups,
} from "@/features/tasks/domain";

import type { Task, TasksState } from "@/features/tasks/types";
import type { DateKey } from "@/shared/lib/date";

/**
 * ---------------------------------------
 * SELECTORS
 * ---------------------------------------
 *
 * Thin adapters between the Zustand store
 * and the domain layer. NO business logic
 * here — only memoization and store-shape
 * access.
 */

/* --- Domain re-exports for back-compat --- */
export {
  isTaskCompletedOn,
  sortTasksByTime,
  filterTasksByDate,
  filterTasksAfterDate,
  filterTasksBeforeDate,
};

/* --- Memoized derivations --- */
export const getTaskTimelineGroups = memoOne(getTaskTimelineGroupsDomain);
export const getTaskProgress = memoOne(getTaskProgressDomain);
export const getTodayCategorySummaries = memoOne(getCategorySummaries);

/* --- Store selectors --- */

export const selectTasks = (state: TasksState): Task[] => state.tasks;

export const selectTasksForDate =
  (date: DateKey) =>
  (state: TasksState): Task[] =>
    filterTasksByDate(state.tasks, date);

export const selectCompletedTasks =
  (date: DateKey) =>
  (state: TasksState): Task[] =>
    state.tasks.filter((task) => isTaskCompletedOn(task, date));

export const selectPendingTasks =
  (date: DateKey) =>
  (state: TasksState): Task[] =>
    state.tasks.filter((task) => !isTaskCompletedOn(task, date));

export const selectTaskGroups =
  (date?: DateKey) =>
  (state: TasksState): TaskTimelineGroups =>
    getTaskTimelineGroups(state.tasks, date ?? getToday());

export const selectTaskProgress =
  (date: DateKey) =>
  (state: TasksState): TaskProgress =>
    getTaskProgress(state.tasks, date);

export const selectCategorySummaries =
  (date: DateKey) =>
  (state: TasksState): CategorySummary[] =>
    getTodayCategorySummaries(state.tasks, date);

export const selectTodayCategorySummaries = selectCategorySummaries;
