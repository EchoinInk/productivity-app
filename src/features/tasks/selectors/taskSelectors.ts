import type { Task } from "@/features/tasks/types/types";

/**
 * CORE
 */

export const selectTasksByDate = (tasks: Task[], date: string) => {
  return tasks.filter((t) => t.date === date);
};

export const selectCompletedTasks = (tasks: Task[]) => {
  return tasks.filter((t) => t.completed);
};

export const selectIncompleteTasks = (tasks: Task[]) => {
  return tasks.filter((t) => !t.completed);
};

/**
 * COMPOSED (DATE-BASED)
 */

export const selectTodayTasks = (tasks: Task[], today: string) => {
  return selectTasksByDate(tasks, today);
};

export const selectCompletedTodayTasks = (tasks: Task[], today: string) => {
  return selectTasksByDate(tasks, today).filter((t) => t.completed);
};

export const selectIncompleteTodayTasks = (tasks: Task[], today: string) => {
  return selectTasksByDate(tasks, today).filter((t) => !t.completed);
};

export const selectUpcomingTasks = (tasks: Task[], today: string) => {
  return tasks.filter((t) => t.date > today);
};

/**
 * DERIVED
 */

export const selectNextTask = (tasks: Task[], today: string) => {
  return selectIncompleteTodayTasks(tasks, today)[0] ?? null;
};