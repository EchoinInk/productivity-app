/**
 * `useTasksData` — single, future-proof entry point for task data.
 *
 * Today this composes the unified `useTasks` hook (Zustand-backed).
 * When the data layer moves to React Query + `taskService`, only this
 * hook needs to change; all consumers keep the same shape.
 */

import { useTasks, type UseTasksResult } from "./useTasks";
import type { DateKey } from "@/shared/lib/date";

export interface UseTasksDataResult extends UseTasksResult {
  isLoading: boolean;
  error: Error | null;
}

export const useTasksData = (date?: DateKey): UseTasksDataResult => {
  const tasks = useTasks(date);
  return { ...tasks, isLoading: false, error: null };
};
