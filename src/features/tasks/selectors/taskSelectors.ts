import { getToday } from "@/shared/lib/date";
import type { Task } from "@/features/tasks/types/types";

export const selectTodayTasks = (tasks: Task[]) => {
  const today = getToday();
  return tasks.filter(t => t.date === today);
};

export const selectCompletedTasks = (tasks: Task[]) => {
  return tasks.filter(t => t.completed);
};

export const selectIncompleteTodayTasks = (tasks: Task[]) => {
  return selectTodayTasks(tasks).filter(t => !t.completed);
};

export const selectCompletedTodayTasks = (tasks: Task[]) => {
  return selectTodayTasks(tasks).filter(t => t.completed);
};

export const selectUpcomingTasks = (tasks: Task[]) => {
  const today = getToday() || new Date().toISOString().split("T")[0]!;
  return tasks.filter(t => t.date > today);
};

export const selectTasksByDate = (tasks: Task[], date: string) => {
  return tasks.filter(t => t.date === date);
};

export const selectNextTask = (tasks: Task[]) => {
  return selectIncompleteTodayTasks(tasks)[0] ?? null;
};
