import { getToday, getYesterday, type DateKey } from "@/shared/lib/date";
import type { Task, TasksState } from "@/features/tasks/types";

/**
 * ---------------------------------------
 * CORE HELPERS (PURE — NO STATE)
 * ---------------------------------------
 */

export const isTaskCompletedOn = (task: Task, date: DateKey) =>
  task.completedDates?.includes(date) ?? false;

/**
 * Safe date comparison (prevents timezone bugs)
 */
const isSameDay = (a: string, b: string) =>
  new Date(a).toDateString() === new Date(b).toDateString();

/**
 * ---------------------------------------
 * SORTING
 * ---------------------------------------
 */

export const sortTasksByTime = (items: Task[], date: DateKey) => {
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

/**
 * ---------------------------------------
 * BASIC FILTERS (PURE)
 * ---------------------------------------
 */

export const filterTasksByDate = (tasks: Task[], date: DateKey) =>
  tasks.filter((task) => isSameDay(task.date, date));

export const filterTasksAfterDate = (tasks: Task[], date: DateKey) =>
  tasks.filter((task) => task.date > date);

export const filterTasksBeforeDate = (tasks: Task[], date: DateKey) =>
  tasks.filter((task) => task.date < date);

/**
 * ---------------------------------------
 * ZUSTAND SELECTORS (STATE-BASED)
 * ---------------------------------------
 */

/**
 * ⚠️ CRITICAL:
 * These are the only selectors your components should use
 */

/**

 * Tasks for a specific date

 */

export const selectTasksForDate =

  (date: DateKey) =>

  (state: TasksState) =>

    state.tasks.filter((task) =>

      task.date === date

    );

/**

 * Completed tasks for a specific date

 */

export const selectCompletedTasks =

  (date: DateKey) =>

  (state: TasksState) =>

    state.tasks.filter((task) =>

      task.completedDates.includes(date)

    );

/**

 * Pending tasks for a specific date

 */

export const selectPendingTasks =

  (date: DateKey) =>

  (state: TasksState) =>

    state.tasks.filter((task) =>

      !task.completedDates.includes(date)

    );

/**
 * ---------------------------------------
 * MEMOIZED DERIVED SELECTORS (ADVANCED)
 * ---------------------------------------
 */

/**
 * Prevents recalculation on every render
 * (simple memo — no external libs)
 */

const memo = <T extends (...args: any[]) => any>(fn: T): T => {
  let lastArgs: any[] = [];
  let lastResult: any;

  return ((...args: any[]) => {
    if (
      args.length === lastArgs.length &&
      args.every((arg, i) => arg === lastArgs[i])
    ) {
      return lastResult;
    }

    lastArgs = args;
    lastResult = fn(...args);
    return lastResult;
  }) as T;
};

/**
 * ---------------------------------------
 * TIMELINE GROUPING (MEMOIZED)
 * ---------------------------------------
 */

export const getTaskTimelineGroups = memo(
  (tasks: Task[], today: DateKey = getToday()) => {
    const yesterday = getYesterday(new Date(`${today}T00:00:00`));

    return {
      today: sortTasksByTime(filterTasksByDate(tasks, today), today),
      upcoming: sortTasksByTime(
        filterTasksAfterDate(tasks, today),
        today
      ),
      yesterday: sortTasksByTime(
        filterTasksByDate(tasks, yesterday),
        yesterday
      ),
    };
  }
);

/**
 * Zustand-friendly version
 */
export const selectTaskTimelineGroups =
  (date?: DateKey) =>
  (state: TasksState) =>
    getTaskTimelineGroups(state.tasks, date);

/**
 * ---------------------------------------
 * PROGRESS (MEMOIZED)
 * ---------------------------------------
 */

export const getTaskProgress = memo(
  (tasks: Task[], date: DateKey) => {
    const datedTasks = filterTasksByDate(tasks, date);

    const completed = datedTasks.filter((task) =>
      isTaskCompletedOn(task, date)
    ).length;

    const total = datedTasks.length;

    return {
      total,
      completed,
      percentage:
        total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  }
);

export const selectTaskProgress =
  (date: DateKey) =>
  (state: TasksState) =>
    getTaskProgress(state.tasks, date);

/**
 * ---------------------------------------
 * CATEGORY SUMMARIES (MEMOIZED)
 * ---------------------------------------
 */

export const getTodayCategorySummaries = memo(
  (tasks: Task[], date: DateKey) => {
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
      if (!isSameDay(task.date, date)) return;

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
  }
);

export const selectTodayCategorySummaries =
  (date: DateKey) =>
  (state: TasksState) =>
    getTodayCategorySummaries(state.tasks, date);