// Domain exports - pure business logic
export * from "@/features/tasks/domain/taskDomain";

// Selector exports - stable data access
export * from "@/features/tasks/selectors/taskSelectors";

// Type exports - public interface
export type {
  Task,
  CreateTaskInput,
  EntityId,
} from "@/features/tasks/types";

// Hook exports - stable accessors
export { useTaskActions } from "@/features/tasks/hooks/useTaskActions";
export { useTasks } from "@/features/tasks/hooks/useTasks";
