import type { Task } from "@/features/tasks/types/types";
import { toDateString, type DateKey, isDateBefore, isDateAfter, isDateSame } from "@/shared/lib/date";
import { safeDate } from "@/utils/safeDate";
import { categoryMetadata } from "@/features/tasks/constants/categories";

/**
 * ---------------------------------------
 * COMPLETION
 * ---------------------------------------
 */

export const isTaskCompleted = (
  task: Task,
  date: DateKey
): boolean => {
  return task.completedDates.includes(date);
};

export const isTaskOverdue = (task: Task, date: DateKey): boolean => {
  return isDateBefore(task.date, date) && !isTaskCompleted(task, date);
};

export type TaskDateKey = DateKey;

export type TaskCompletionStats = {
  total: number;
  completed: number;
  percentage: number;
};

export const getTodayDateKey = (): TaskDateKey => {
  return toDateString(new Date());
};

export const getTaskCompletionStats = (
  tasks: Task[],
  date: DateKey
): TaskCompletionStats => {
  const total = tasks.length;
  const completed = tasks.filter((task) => isTaskCompleted(task, date)).length;

  return {
    total,
    completed,
    percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
};

export const toggleTaskCompletion = (
  task: Task,
  date: DateKey
): Task => {
  const exists = isTaskCompleted(task, date);

  return {
    ...task,
    completedDates: exists
      ? task.completedDates.filter((d) => d !== date)
      : [...task.completedDates, date],
  };
};

/**
 * ---------------------------------------
 * FILTERING
 * ---------------------------------------
 */

const isSameDay = (a: string, b: string): boolean => {
  return isDateSame(a, b);
};

export const getTasksForDate = (
  tasks: Task[],
  date: DateKey
): Task[] => {
  return tasks.filter((task) => isSameDay(task.date, date));
};

export const getTasksAfterDate = (
  tasks: Task[],
  date: DateKey
): Task[] => {
  return tasks.filter((task) => isDateAfter(task.date, date));
};

export const getTasksBeforeDate = (
  tasks: Task[],
  date: DateKey
): Task[] => {
  return tasks.filter((task) => isDateBefore(task.date, date));
};

const getYesterdayDateKey = (date: DateKey): DateKey => {
  const yesterday = safeDate(date);
  yesterday.setDate(yesterday.getDate() - 1);
  return toDateString(yesterday);
};

export const filterTodayTasks = (
  tasks: Task[],
  date: DateKey
): Task[] => {
  return sortTasks(getTasksForDate(tasks, date), date);
};

export const filterUpcomingTasks = (
  tasks: Task[],
  date: DateKey
): Task[] => {
  return sortTasks(getTasksAfterDate(tasks, date), date);
};

export const filterYesterdayTasks = (
  tasks: Task[],
  date: DateKey
): Task[] => {
  const yesterdayKey = getYesterdayDateKey(date);
  return sortTasks(getTasksForDate(tasks, yesterdayKey), yesterdayKey);
};

/**
 * ---------------------------------------
 * SORTING
 * ---------------------------------------
 */

export const sortTasks = (
  tasks: Task[],
  date: DateKey
): Task[] => {
  return [...tasks].sort((a, b) => {
    const doneDiff =
      Number(isTaskCompleted(a, date)) -
      Number(isTaskCompleted(b, date));

    if (doneDiff !== 0) return doneDiff;

    if (!a.time && !b.time) return a.label.localeCompare(b.label);
    if (!a.time) return 1;
    if (!b.time) return -1;

    return a.time.localeCompare(b.time);
  });
};

/**
 * ---------------------------------------
 * GROUPING
 * ---------------------------------------
 */

export interface TaskTimelineGroups {
  today: Task[];
  upcoming: Task[];
  yesterday: Task[];
}

export const getTaskGroups = (
  tasks: Task[],
  today: DateKey
): TaskTimelineGroups => {
  return {
    today: filterTodayTasks(tasks, today),
    upcoming: filterUpcomingTasks(tasks, today),
    yesterday: filterYesterdayTasks(tasks, today),
  };
};

/**
 * ---------------------------------------
 * PROGRESS
 * ---------------------------------------
 */

export interface TaskProgress {
  total: number;
  completed: number;
  percentage: number;
}

export const getTaskProgress = (
  tasks: Task[],
  date: DateKey
): TaskProgress => {
  const datedTasks = getTasksForDate(tasks, date);

  const completed = datedTasks.filter((task) =>
    isTaskCompleted(task, date)
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
 * ---------------------------------------
 * CATEGORY SUMMARIES
 * ---------------------------------------
 */

export interface CategorySummary {
  category: string;
  active: number;
  total: number;
  completed: number;
}

export const getCategorySummaries = (
  tasks: Task[],
  date: DateKey
): CategorySummary[] => {
  const map = new Map<string, CategorySummary>();

  tasks.forEach((task) => {
    if (!isSameDay(task.date, date)) return;

    const category = task.category || "Other";

    const current =
      map.get(category) ?? {
        category,
        active: 0,
        total: 0,
        completed: 0,
      };

    const done = isTaskCompleted(task, date);

    current.total += 1;
    current.completed += done ? 1 : 0;
    current.active += done ? 0 : 1;

    map.set(category, current);
  });

  return [...map.values()].sort((a, b) => b.active - a.active);
};

/**
 * ---------------------------------------
 * INSIGHTS
 * ---------------------------------------
 */

export const getActiveCategorySummaries = (
  summaries: CategorySummary[]
): CategorySummary[] => {
  return summaries.filter((s) => s.active > 0);
};

/**
 * ---------------------------------------
 * PRESENTATION DERIVATION (TASK-SCOPED)
 * ---------------------------------------
 */

export type TaskCategoryMetadata = {
  bg: string;
  text: string;
  icon: string;
};

export const getCategoryMetadata = (category?: string): TaskCategoryMetadata => {
  const fallbackKey = "Other";
  const key = (category || fallbackKey) as keyof typeof categoryMetadata;
  return categoryMetadata[key] ?? categoryMetadata[fallbackKey];
};

export const formatTaskDisplayDate = (date: string): string => {
  const parsed = safeDate(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
};

export const formatTaskDateTime = (date: string, time?: string): string => {
  return [formatTaskDisplayDate(date), time].filter(Boolean).join(" • ");
};

export const buildTaskSubtitle = (task: Task): string => {
  return [task.notes, formatTaskDateTime(task.date, task.time)]
    .filter(Boolean)
    .join(" • ");
};