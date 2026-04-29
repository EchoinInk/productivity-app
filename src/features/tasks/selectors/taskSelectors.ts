import { getToday } from "@/shared/lib/date";

import {
  getTasksForDate,
  getCategorySummaries,
  getTaskProgress,
  getTaskGroups,
  isTaskCompleted,
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
 */

/* --- Store selectors --- */

export const selectTasks = (state: TasksState): Task[] => state.tasks;

export const selectTaskProgress =
  (date: DateKey) =>
  (state: TasksState): TaskProgress =>
    getTaskProgress(state.tasks, date);

export const selectTaskById =
  (id: string) =>
  (state: TasksState): Task | null =>
    state.tasks.find((task) => String(task.id) === id) ?? null;

/** Action selectors — keep references stable across renders. */
export const selectAddTask = (s: TasksState) => s.addTask;
export const selectToggleTask = (s: TasksState) => s.toggleTask;
export const selectUpdateTask = (s: TasksState) => s.updateTask;
export const selectDeleteTask = (s: TasksState) => s.deleteTask;

/* --- Re-export for UI --- */
export { isTaskCompleted };
