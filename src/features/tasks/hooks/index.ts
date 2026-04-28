/**
 * Tasks feature hooks — single public entry point.
 *
 * `useTasks` is the primary API. `useTaskActions` is a thin
 * memoized accessor for stores wiring (modals, edit flows).
 */
export { useTasks } from "./useTasks";
export type {
  TaskActions,
  TaskInsights,
  TaskSection,
  UseTasksResult,
} from "./useTasks";

export { useTaskActions } from "./useTaskActions";
