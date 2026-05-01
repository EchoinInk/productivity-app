// Domain exports - pure business logic
export * from "@/features/tasks/domain/taskDomain";

// Type exports - public interface
export type {
  Task,
  CreateTaskInput,
  EntityId,
} from "@/features/tasks/types/types";

// Hook exports - stable accessors
export { useTasks, useTaskById } from "@/features/tasks/hooks/useTasks";
export { isTaskCompleted } from "@/features/tasks/domain/taskDomain";
