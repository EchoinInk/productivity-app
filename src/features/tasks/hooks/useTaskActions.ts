import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import {
  selectAddTask,
  selectDeleteTask,
  selectToggleTask,
  selectUpdateTask,
} from "@/features/tasks/selectors/taskSelectors";

/**
 * Stable accessors for individual store actions.
 *
 * Kept as a thin shim over the new unified `useTasks`
 * hook so existing call sites (e.g. `TodayPage`,
 * `TasksPage`) keep working without change.
 *
 * Each action is selected individually so consumers
 * never subscribe to the full store.
 */
export const useTaskActions = () => ({
  addTask: useTasksStore(selectAddTask),
  toggleTask: useTasksStore(selectToggleTask),
  updateTask: useTasksStore(selectUpdateTask),
  deleteTask: useTasksStore(selectDeleteTask),
});
