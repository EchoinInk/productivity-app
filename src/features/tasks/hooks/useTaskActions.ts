import { useMemo } from "react";

import { useTasksStore } from "@/features/tasks/store/useTasksStore";

import type { TaskActions } from "./useTasks";

/**
 * Stable accessors for individual store actions.
 *
 * Memoized so the returned object identity is stable across
 * renders, preventing prop-identity churn in memoized children.
 */
export const useTaskActions = (): TaskActions => {
  const addTask = useTasksStore((state) => state.addTask);
  const toggleTask = useTasksStore((state) => state.toggleTask);
  const updateTask = useTasksStore((state) => state.updateTask);
  const deleteTask = useTasksStore((state) => state.deleteTask);

  return useMemo(
    () => ({ addTask, toggleTask, updateTask, deleteTask }),
    [addTask, toggleTask, updateTask, deleteTask],
  );
};
