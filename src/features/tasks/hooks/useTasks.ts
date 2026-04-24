import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import {
  getActiveCategorySummaries,
  selectAddTask,
  selectCategorySummaries,
  selectDeleteTask,
  selectTaskGroups,
  selectTaskProgress,
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
 * Pure orchestration — no business logic.
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

  const groups = useTasksStore(selectTaskGroups(activeDate));
  const progress = useTasksStore(selectTaskProgress(activeDate));
  const summaries = useTasksStore(selectCategorySummaries(activeDate));

  const addTask = useTasksStore(selectAddTask);
  const toggleTask = useTasksStore(selectToggleTask);
  const updateTask = useTasksStore(selectUpdateTask);
  const deleteTask = useTasksStore(selectDeleteTask);

  // ✅ FIX: moved to domain
  const active = getActiveCategorySummaries(summaries);

  return {
    activeDate,
    groups,
    progress,
    insights: {
      summaries,
      active,
      hasInsights: active.length > 0,
    },
    actions: { addTask, toggleTask, updateTask, deleteTask },
  };
};
