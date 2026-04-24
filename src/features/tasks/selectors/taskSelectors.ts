import { getToday } from "@/shared/lib/date";

import {
  filterTasksByDate,
  getCategorySummaries,
  getTaskProgress as getTaskProgressDomain,
  getTaskTimelineGroups as getTaskTimelineGroupsDomain,
  isTaskCompletedOn,
  type CategorySummary,
  type TaskProgress,
  type TaskTimelineGroups,
} from "@/features/tasks/domain";

import type { Task, TasksState } from "@/features/tasks/types";
import type { DateKey } from "@/shared/lib/date";

/**
 * ---------------------------------------
 * SELECTORS — thin wrappers
 * ---------------------------------------
 *
 * Each selector ONLY calls a domain function.
 * No inline filtering / sorting / mapping.
 */

/* --- Domain re-exports kept for back-compat (used by tests) --- */
export const getTaskProgress = getTaskProgressDomain;
export const getTaskTimelineGroups = getTaskTimelineGroupsDomain;

/* --- Store selectors --- */

export const selectTasks = (state: TasksState): Task[] => state.tasks;

export const selectTasksForDate =
  (date: DateKey) =>
  (state: TasksState): Task[] =>
    filterTasksByDate(state.tasks, date);

export const selectTaskGroups =
  (date: DateKey = getToday()) =>
  (state: TasksState): TaskTimelineGroups =>
    getTaskTimelineGroupsDomain(state.tasks, date);

export const selectTaskProgress =
  (date: DateKey) =>
  (state: TasksState): TaskProgress =>
    getTaskProgressDomain(state.tasks, date);

export const selectCategorySummaries =
  (date: DateKey) =>
  (state: TasksState): CategorySummary[] =>
    getCategorySummaries(state.tasks, date);

/** Action selectors — keep references stable across renders. */
export const selectAddTask = (s: TasksState) => s.addTask;
export const selectToggleTask = (s: TasksState) => s.toggleTask;
export const selectUpdateTask = (s: TasksState) => s.updateTask;
export const selectDeleteTask = (s: TasksState) => s.deleteTask;

/* --- Re-exported for components that already import from here --- */
export { isTaskCompletedOn };
