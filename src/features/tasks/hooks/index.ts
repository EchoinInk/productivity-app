/**
 * Tasks feature hooks — single public entry point.
 *
 * `useTasks` is the primary API. The granular hooks
 * (`useTaskActions`, etc.) are kept as thin shims for
 * existing call sites outside this feature folder.
 */
export { useTasks } from "./useTasks";
export type {
  TaskActions,
  TaskInsights,
  UseTasksResult,
} from "./useTasks";

export { useTaskActions } from "./useTaskActions";
export { useTasksData } from "./useTasksData";
export type { UseTasksDataResult } from "./useTasksData";
