import { useMemo } from "react";

import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import {
  selectAddTask,
  selectDeleteTask,
  selectToggleTask,
  selectUpdateTask,
} from "@/features/tasks/api";

import type { TaskActions } from "./useTasks";

/**
 * Stable accessors for individual store actions.
 *
 * Memoized so the returned object identity is stable across
 * renders, preventing prop-identity churn in memoized children.
 */
export const useTaskActions = (): TaskActions => {
  const addTask = useTasksStore(selectAddTask);
  const toggleTask = useTasksStore(selectToggleTask);
  const updateTask = useTasksStore(selectUpdateTask);
  const deleteTask = useTasksStore(selectDeleteTask);

  return useMemo(
    () => ({ addTask, toggleTask, updateTask, deleteTask }),
    [addTask, toggleTask, updateTask, deleteTask],
  );
};
