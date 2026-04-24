/**
 * ---------------------------------------
 * TASKS DOMAIN — public barrel
 * ---------------------------------------
 *
 * The domain layer owns ALL business logic
 * for the tasks feature: completion checks,
 * sorting, grouping, progress, category
 * summaries, and formatting.
 *
 * Selectors and hooks compose these helpers;
 * UI components must never duplicate them.
 */

export {
  isTaskCompletedOn,
  checkCompletion,
  toggleCompletion,
} from "./completion";

export { sortTasksByTime } from "./sorting";

export {
  filterTasksByDate,
  filterTasksAfterDate,
  filterTasksBeforeDate,
  getTaskTimelineGroups,
  type TaskTimelineGroups,
} from "./grouping";

export {
  getTaskProgress,
  getProgressForTasks,
  type TaskProgress,
} from "./progress";

export {
  getCategorySummaries,
  type CategorySummary,
} from "./categories";

export { buildTaskSubtitle } from "./formatting";

export { memoOne } from "./memo";
