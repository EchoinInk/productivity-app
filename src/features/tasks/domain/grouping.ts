import { getToday, getYesterday } from "@/shared/lib/date";

import { sortTasksByTime } from "./sorting";

import type { Task } from "@/features/tasks/types";
import type { DateKey } from "@/shared/lib/date";

/**
 * ---------------------------------------
 * GROUPING DOMAIN
 * ---------------------------------------
 */

const isSameDay = (a: string, b: string) =>
  new Date(a).toDateString() === new Date(b).toDateString();

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

export interface TaskTimelineGroups {
  today: Task[];
  upcoming: Task[];
  yesterday: Task[];
}

/**
 * Pure timeline grouping. Returns sorted
 * lists for today / upcoming / yesterday.
 */
export const getTaskTimelineGroups = (
  tasks: Task[],
  today: DateKey = getToday(),
): TaskTimelineGroups => {
  const yesterday = getYesterday(new Date(`${today}T00:00:00`));

  return {
    today: sortTasksByTime(filterTasksByDate(tasks, today), today),
    upcoming: sortTasksByTime(
      filterTasksAfterDate(tasks, today),
      today,
    ),
    yesterday: sortTasksByTime(
      filterTasksByDate(tasks, yesterday),
      yesterday,
    ),
  };
};
