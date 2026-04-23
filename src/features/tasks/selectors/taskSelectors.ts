import { getToday, getYesterday, type DateKey } from "@/shared/lib/date";
import type { Task } from "@/features/tasks/types";

/**
 * CORE HELPERS
 */

export const isTaskCompletedOn = (task: Task, date: DateKey) =>
  task.completedDates?.includes(date) ?? false;

/**
 * SORTING
 */

export const sortTasksByTime = (items: Task[], date: DateKey) =>
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

/**
 * BASIC FILTERS (NEW — IMPORTANT FOR CONSISTENCY)
 */

export const selectTasksByDate =
  (date: DateKey) =>
  (tasks: Task[]) =>
    tasks.filter((task) => task.date === date);

export const selectTasksAfterDate =
  (date: DateKey) =>
  (tasks: Task[]) =>
    tasks.filter((task) => task.date > date);

export const selectTasksBeforeDate =
  (date: DateKey) =>
  (tasks: Task[]) =>
    tasks.filter((task) => task.date < date);

/**
 * TIMELINE GROUPING (YOUR EXISTING — CLEANED SLIGHTLY)
 */

export const getTaskTimelineGroups = (
  tasks: Task[],
  today: DateKey = getToday()
) => {
  const yesterday = getYesterday(new Date(`${today}T00:00:00`));

  return {
    today: sortTasksByTime(
      selectTasksByDate(today)(tasks),
      today
    ),
    upcoming: sortTasksByTime(
      selectTasksAfterDate(today)(tasks),
      today
    ),
    yesterday: sortTasksByTime(
      selectTasksByDate(yesterday)(tasks),
      yesterday
    ),
  };
};

/**
 * PROGRESS
 */

export const getTaskProgress = (tasks: Task[], date: DateKey) => {
  const datedTasks = selectTasksByDate(date)(tasks);

  const completed = datedTasks.filter((task) =>
    isTaskCompletedOn(task, date)
  ).length;

  return {
    total: datedTasks.length,
    completed,
    percentage:
      datedTasks.length === 0
        ? 0
        : Math.round((completed / datedTasks.length) * 100),
  };
};

/**
 * CATEGORY SUMMARIES
 */

export const getTodayCategorySummaries = (
  tasks: Task[],
  date: DateKey
) => {
  const summaries = new Map<
    string,
    {
      category: string;
      active: number;
      total: number;
      completed: number;
    }
  >();

  tasks.forEach((task) => {
    if (task.date !== date) return;

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
    (a, b) => b.active - a.active
  );
};