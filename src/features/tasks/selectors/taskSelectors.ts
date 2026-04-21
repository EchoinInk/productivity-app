import { getToday, getYesterday, type DateKey } from "@/shared/lib/date";
import type { Task } from "@/features/tasks/types";

export const isTaskCompletedOn = (task: Task, date: DateKey) => task.completedDates?.includes(date) ?? false;

export const sortTasksByTime = (items: Task[], date: DateKey) =>
  [...items].sort((a, b) => {
    const doneDiff = Number(isTaskCompletedOn(a, date)) - Number(isTaskCompletedOn(b, date));
    if (doneDiff !== 0) return doneDiff;
    if (!a.time && !b.time) return a.label.localeCompare(b.label);
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });

export const getTaskTimelineGroups = (tasks: Task[], today: DateKey = getToday()) => {
  const yesterday = getYesterday(new Date(`${today}T00:00:00`));

  return {
    today: sortTasksByTime(tasks.filter((task) => task.date === today), today),
    upcoming: sortTasksByTime(tasks.filter((task) => task.date > today), today),
    yesterday: sortTasksByTime(tasks.filter((task) => task.date === yesterday), yesterday),
  };
};

export const getTaskProgress = (tasks: Task[], date: DateKey) => {
  const datedTasks = tasks.filter((task) => task.date === date);
  const completed = datedTasks.filter((task) => isTaskCompletedOn(task, date)).length;

  return {
    total: datedTasks.length,
    completed,
    percentage: datedTasks.length === 0 ? 0 : Math.round((completed / datedTasks.length) * 100),
  };
};

export const getTodayCategorySummaries = (tasks: Task[], date: DateKey) => {
  const summaries = new Map<string, { category: string; active: number; total: number; completed: number }>();

  tasks.forEach((task) => {
    if (task.date !== date) return;
    const category = task.category || "Other";
    const current = summaries.get(category) ?? { category, active: 0, total: 0, completed: 0 };
    const completed = isTaskCompletedOn(task, date);

    current.total += 1;
    current.completed += completed ? 1 : 0;
    current.active += completed ? 0 : 1;
    summaries.set(category, current);
  });

  return [...summaries.values()].sort((a, b) => b.active - a.active);
};
