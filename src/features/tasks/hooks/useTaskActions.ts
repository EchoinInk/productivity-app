import { useTasksStore } from "@/features/tasks/store/useTasksStore";

import type { TasksState } from "@/features/tasks/types";

/**
 * Stable, side-effect-free accessors for the
 * tasks store. Each action is selected
 * individually so consumers don't subscribe
 * to the full state.
 */

const selectAddTask = (s: TasksState) => s.addTask;
const selectToggleTask = (s: TasksState) => s.toggleTask;
const selectUpdateTask = (s: TasksState) => s.updateTask;
const selectDeleteTask = (s: TasksState) => s.deleteTask;

export const useTaskActions = () => ({
  addTask: useTasksStore(selectAddTask),
  toggleTask: useTasksStore(selectToggleTask),
  updateTask: useTasksStore(selectUpdateTask),
  deleteTask: useTasksStore(selectDeleteTask),
});
