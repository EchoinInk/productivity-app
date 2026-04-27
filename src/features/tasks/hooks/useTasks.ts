import { useMemo } from "react";

import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import {
  getActiveCategorySummaries,
  getCategorySummaries,
  getTaskGroups,
  getTaskProgress,
  selectAddTask,
  selectDeleteTask,
  selectTasks,
  selectToggleTask,
  selectUpdateTask,
  type CategorySummary,
  type TaskProgress,
  type TaskTimelineGroups,
} from "@/features/tasks/api";

import { getToday, type DateKey } from "@/shared/lib/date";

import type {
  CreateTaskInput,
  EntityId,
  Task,
} from "@/features/tasks/types";

/**
 * Unified UI hook for the tasks feature.
 *
 * Subscribes to raw `tasks` once and derives all views via `useMemo`.
 * This avoids creating fresh selector closures per render and ensures
 * derived results are reused across renders when inputs are unchanged.
 */

export interface TaskInsights {
  summaries: CategorySummary[];
  active: CategorySummary[];
  hasInsights: boolean;
}

export interface TaskActions {
  addTask: (input: CreateTaskInput) => void;
  toggleTask: (id: EntityId, date: DateKey) => void;
  updateTask: (id: EntityId, updates: Partial<Task>) => void;
  deleteTask: (id: EntityId) => void;
}

export interface UseTasksResult {
  activeDate: DateKey;
  groups: TaskTimelineGroups;
  progress: TaskProgress;
  insights: TaskInsights;
  actions: TaskActions;
}

export const useTasks = (date?: DateKey): UseTasksResult => {
  const activeDate = date ?? getToday();

  // Single subscription to the underlying list.
  const tasks = useTasksStore(selectTasks);

  // Stable action references (Zustand actions are stable by construction).
  const addTask = useTasksStore(selectAddTask);
  const toggleTask = useTasksStore(selectToggleTask);
  const updateTask = useTasksStore(selectUpdateTask);
  const deleteTask = useTasksStore(selectDeleteTask);

  const groups = useMemo(
    () => getTaskGroups(tasks, activeDate),
    [tasks, activeDate],
  );

  const progress = useMemo(
    () => getTaskProgress(tasks, activeDate),
    [tasks, activeDate],
  );

  const summaries = useMemo(
    () => getCategorySummaries(tasks, activeDate),
    [tasks, activeDate],
  );

  const active = useMemo(
    () => getActiveCategorySummaries(summaries),
    [summaries],
  );

  const insights = useMemo<TaskInsights>(
    () => ({ summaries, active, hasInsights: active.length > 0 }),
    [summaries, active],
  );

  const actions = useMemo<TaskActions>(
    () => ({ addTask, toggleTask, updateTask, deleteTask }),
    [addTask, toggleTask, updateTask, deleteTask],
  );

  return { activeDate, groups, progress, insights, actions };
};
