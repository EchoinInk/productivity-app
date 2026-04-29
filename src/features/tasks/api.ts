// Domain exports - pure business logic
export * from "@/features/tasks/domain/taskDomain";

// Type exports - public interface
export type {
  Task,
  CreateTaskInput,
  EntityId,
} from "@/features/tasks/types/types";

// Hook exports - stable accessors
export { useTaskActions } from "@/features/tasks/hooks/useTaskActions";
export { useTasksList } from "@/features/tasks/store/useTasksStore";
export { useTaskProgress } from "@/features/tasks/store/useTasksStore";
export { isTaskCompleted } from "@/features/tasks/store/useTasksStore";
