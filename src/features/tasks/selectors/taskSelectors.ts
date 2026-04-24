import { getToday } from "@/shared/lib/date";

import {
  getCategorySummaries,
  getTaskProgress,
  getTaskTimelineGroups,
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
 * lives here — only memoization and store
 * shape access.
 */

/**
 * --- Domain re-exports for convenience ---
 *
 * Components and tests historically imported
 * pure helpers from this module; keep that
 * surface so existing imports keep working.
 */
export {
  isTaskCompletedOn,
  sortTasksByTime,
  filterTasksByDate,
  filterTasksAfterDate,
  filterTasksBeforeDate,
};

/**
 * --- Memoized derivations ---
 */
export const getTaskTimelineGroupsMemo = memoOne(getTaskTimelineGroups);
export const getTaskProgressMemo = memoOne(getTaskProgress);
export const getCategorySummariesMemo = memoOne(getCategorySummaries);

/**
 * Legacy aliases used by existing call sites.
 */
export const getTodayCategorySummaries = getCategorySummariesMemo;
export {
  getTaskTimelineGroupsMemo as getTaskTimelineGroups,
  getTaskProgressMemo as getTaskProgress,
};

/**
 * ---------------------------------------
 * STORE SELECTORS
 * ---------------------------------------
 */

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
    getTaskTimelineGroupsMemo(state.tasks, date ?? getToday());

export const selectTaskProgress =
  (date: DateKey) =>
  (state: TasksState): TaskProgress =>
    getTaskProgressMemo(state.tasks, date);

export const selectCategorySummaries =
  (date: DateKey) =>
  (state: TasksState): CategorySummary[] =>
    getCategorySummariesMemo(state.tasks, date);

export const selectTodayCategorySummaries = selectCategorySummaries;
