import { getToday, getYesterday, type DateKey } from "@/shared/lib/date";
import type { Task, TasksState } from "@/features/tasks/types";

/**
 * ---------------------------------------
 * CORE HELPERS (PURE)
 * ---------------------------------------
 */

export const isTaskCompletedOn = (task: Task, date: DateKey) =>
  task.completedDates?.includes(date) ?? false;

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
 * FILTERS (PURE)
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
 * SIMPLE SELECTORS (STATE)
 * ---------------------------------------
 */

export const selectTasksForDate =
  (date: DateKey) =>
  (state: TasksState) =>
    filterTasksByDate(state.tasks, date);

export const selectCompletedTasks =
  (date: DateKey) =>
  (state: TasksState) =>
    state.tasks.filter((task) =>
      isTaskCompletedOn(task, date)
    );

export const selectPendingTasks =
  (date: DateKey) =>
  (state: TasksState) =>
    state.tasks.filter(
      (task) => !isTaskCompletedOn(task, date)
    );

/**
 * ---------------------------------------
 * SIMPLE MEMO UTIL
 * ---------------------------------------
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
 * TIMELINE GROUPING
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
 * ✅ FINAL SELECTOR (THIS IS WHAT UI SHOULD USE)
 */

export const selectTaskGroups =
  (date?: DateKey) =>
  (state: TasksState) => {
    const today = date ?? getToday();
    return getTaskTimelineGroups(state.tasks, today);
  };

/**
 * ---------------------------------------
 * PROGRESS
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
 * CATEGORY SUMMARY
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