import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { selectTaskGroups } from "@/features/tasks/selectors/taskSelectors";

/**
 * ✅ Fully selector-driven hook
 */
export const useTaskGroups = () => {
  return useTasksStore(selectTaskGroups());
};