import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import {
  selectTaskGroups,
  selectTaskProgress,
  selectCategorySummaries,
} from "@/features/tasks/selectors/taskSelectors";
import { getToday, type DateKey } from "@/shared/lib/date";

import type {
  CategorySummary,
  TaskProgress,
  TaskTimelineGroups,
} from "@/features/tasks/domain";
import type { EntityId } from "@/features/tasks/types";

export interface TasksForDateView {
  activeDate: DateKey;
  timeline: TaskTimelineGroups;
  progress: TaskProgress;
  categories: CategorySummary[];
  toggleTask: (id: EntityId, date: DateKey) => void;
}

/**
 * Composite view-model for a single date —
 * useful for screens that need timeline +
 * progress + categories together.
 */
export const useTasksForDate = (
  date?: DateKey,
): TasksForDateView => {
  const activeDate = date ?? getToday();

  const timeline = useTasksStore(selectTaskGroups(activeDate));
  const progress = useTasksStore(selectTaskProgress(activeDate));
  const categories = useTasksStore(selectCategorySummaries(activeDate));
  const toggleTask = useTasksStore((s) => s.toggleTask);

  return {
    activeDate,
    timeline,
    progress,
    categories,
    toggleTask,
  };
};
