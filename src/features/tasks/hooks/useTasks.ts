import { useMemo } from "react";

import { useTasksStore, useTasksList } from "@/features/tasks/store/useTasksStore";
import {
  buildTaskSubtitle,
  getActiveCategorySummaries,
  getCategorySummaries,
  getTaskCompletionStats,
  getTaskProgress,
  isTaskCompleted,
  type CategorySummary,
  type TaskProgress,
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
 * Subscribes to the raw `tasks` list once and derives every view
 * via `useMemo`. Consumers re-render only when the underlying
 * `tasks` array (or the active date) changes.
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

export type TaskSectionType = "today" | "upcoming" | "yesterday";

export interface TaskRowVM {
  id: string;
  title: string;
  subtitle: string;
  isCompleted: boolean;
  category: string | null;
}

export interface TaskSection {
  type: TaskSectionType;
  title: string;
  tasks: TaskRowVM[];
  total: number;
  completed: number;
  percentage: number;
  emptyMessage: string;
  emptyHint: string;
}

export interface UseTasksResult {
  activeDate: DateKey;
  progress: TaskProgress;
  insights: TaskInsights;
  sections: TaskSection[];
  actions: TaskActions;
}

const SECTION_CONFIG: ReadonlyArray<{
  type: TaskSectionType;
  title: string;
  emptyMessage: string;
  emptyHint: string;
}> = [
  {
    type: "today",
    title: "Today",
    emptyMessage: "No tasks for today",
    emptyHint: "Add a task to get started",
  },
  {
    type: "upcoming",
    title: "Upcoming",
    emptyMessage: "Nothing coming up",
    emptyHint: "Nothing scheduled here",
  },
  {
    type: "yesterday",
    title: "Yesterday",
    emptyMessage: "No tasks from yesterday",
    emptyHint: "Nothing scheduled here",
  },
];

const toRowVM = (task: Task, date: DateKey): TaskRowVM => ({
  id: String(task.id),
  title: task.label,
  subtitle: buildTaskSubtitle(task),
  isCompleted: isTaskCompleted(task, date),
  category: task.category ?? null,
});

export const useTasks = (date?: DateKey): UseTasksResult => {
  const activeDate = date ?? getToday();

  const tasks = useTasksList();

  const addTask = useTasksStore((state) => state.addTask);
  const toggleTask = useTasksStore((state) => state.toggleTask);
  const updateTask = useTasksStore((state) => state.updateTask);
  const deleteTask = useTasksStore((state) => state.deleteTask);

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

  const sections = useMemo<TaskSection[]>(() => {
    return SECTION_CONFIG.map((cfg) => {
      const sectionTasks = tasks.filter((task) => {
        // Simple filtering based on task date and section type
        const taskDate = task.date || activeDate;
        if (cfg.type === "today") return taskDate === activeDate;
        if (cfg.type === "upcoming") return taskDate > activeDate;
        if (cfg.type === "yesterday") return taskDate < activeDate;
        return false;
      });
      const stats = getTaskCompletionStats(sectionTasks, activeDate);
      return {
        type: cfg.type,
        title: cfg.title,
        emptyMessage: cfg.emptyMessage,
        emptyHint: cfg.emptyHint,
        tasks: sectionTasks.map((t) => toRowVM(t, activeDate)),
        total: stats.total,
        completed: stats.completed,
        percentage: stats.percentage,
      };
    });
  }, [tasks, activeDate]);

  const actions = useMemo<TaskActions>(
    () => ({ addTask, toggleTask, updateTask, deleteTask }),
    [addTask, toggleTask, updateTask, deleteTask],
  );

  return { activeDate, progress, insights, sections, actions };
};

