import { getToday, getYesterday } from "@/shared/lib/date";

import type { Task } from "@/features/tasks/types";
import type { DateKey } from "@/shared/lib/date";

/**
 * ---------------------------------------
 * TASK DOMAIN (single module)
 * ---------------------------------------
 *
 * Owns ALL business logic for tasks:
 *   - completion checks & toggling
 *   - sorting
 *   - grouping (today / upcoming / yesterday)
 *   - progress calculation
 *   - category insights
 *
 * Rules:
 *   - pure functions only
 *   - no React, no Zustand, no UI imports
 *   - NO formatting (that lives in /shared/lib/taskFormat.ts)
 */

/* ============================================================
 * TYPES
 * ============================================================ */

export interface TaskProgress {
  total: number;
  completed: number;
  percentage: number;
}

export interface TaskTimelineGroups {
  today: Task[];
  upcoming: Task[];
  yesterday: Task[];
}

export interface CategorySummary {
  category: string;
  active: number;
  total: number;
  completed: number;
}

/* ============================================================
 * INTERNAL HELPERS
 * ============================================================ */

const isSameDay = (a: string, b: string): boolean =>
  new Date(a).toDateString() === new Date(b).toDateString();

const percent = (completed: number, total: number): number =>
  total === 0 ? 0 : Math.round((completed / total) * 100);

/* ============================================================
 * COMPLETION
 * ============================================================ */

export const isTaskCompletedOn = (
  task: Task,
  date: DateKey,
): boolean => task.completedDates?.includes(date) ?? false;

/** Alias kept for naming clarity at call sites. */
export const checkCompletion = isTaskCompletedOn;

/**
 * Returns a NEW task with the completion state for `date`
 * toggled. Pure — never mutates the input.
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

/* ============================================================
 * SORTING
 * ============================================================
 *
 * Order:
 *   1. Incomplete before completed
 *   2. Tasks with a time before tasks without
 *   3. Earlier time first
 *   4. Fall back to alphabetical label
 */
export const sortTasksByTime = (
  items: Task[],
  date: DateKey,
): Task[] =>
  [...items].sort((a, b) => {
    const doneDiff =
      Number(isTaskCompletedOn(a, date)) -
      Number(isTaskCompletedOn(b, date));
    if (doneDiff !== 0) return doneDiff;

    if (!a.time && !b.time) return a.label.localeCompare(b.label);
    if (!a.time) return 1;
    if (!b.time) return -1;

    return a.time.localeCompare(b.time);
  });

/* ============================================================
 * GROUPING
 * ============================================================ */

export const filterTasksByDate = (
  tasks: Task[],
  date: DateKey,
): Task[] => tasks.filter((task) => isSameDay(task.date, date));

export const filterTasksAfterDate = (
  tasks: Task[],
  date: DateKey,
): Task[] => tasks.filter((task) => task.date > date);

export const filterTasksBeforeDate = (
  tasks: Task[],
  date: DateKey,
): Task[] => tasks.filter((task) => task.date < date);

export const getTaskTimelineGroups = (
  tasks: Task[],
  today: DateKey = getToday(),
): TaskTimelineGroups => {
  const yesterday = getYesterday(new Date(`${today}T00:00:00`));

  return {
    today: sortTasksByTime(filterTasksByDate(tasks, today), today),
    upcoming: sortTasksByTime(filterTasksAfterDate(tasks, today), today),
    yesterday: sortTasksByTime(
      filterTasksByDate(tasks, yesterday),
      yesterday,
    ),
  };
};

/* ============================================================
 * PROGRESS
 * ============================================================ */

export const getTaskProgress = (
  tasks: Task[],
  date: DateKey,
): TaskProgress => {
  const datedTasks = filterTasksByDate(tasks, date);
  const completed = datedTasks.filter((t) => isTaskCompletedOn(t, date)).length;
  const total = datedTasks.length;

  return { total, completed, percentage: percent(completed, total) };
};

/**
 * Progress against an already-filtered task list (e.g. inside a
 * section where tasks are pre-bucketed).
 */
export const getProgressForTasks = (
  tasks: Task[],
  date: DateKey,
): TaskProgress => {
  const completed = tasks.filter((t) => isTaskCompletedOn(t, date)).length;
  const total = tasks.length;

  return { total, completed, percentage: percent(completed, total) };
};

/* ============================================================
 * CATEGORY INSIGHTS
 * ============================================================ */

export const getCategorySummaries = (
  tasks: Task[],
  date: DateKey,
): CategorySummary[] => {
  const summaries = new Map<string, CategorySummary>();

  tasks.forEach((task) => {
    if (!isSameDay(task.date, date)) return;

    const category = task.category || "Other";
    const current =
      summaries.get(category) ??
      { category, active: 0, total: 0, completed: 0 };

    const completed = isTaskCompletedOn(task, date);

    current.total += 1;
    current.completed += completed ? 1 : 0;
    current.active += completed ? 0 : 1;

    summaries.set(category, current);
  });

  return [...summaries.values()].sort((a, b) => b.active - a.active);
};
