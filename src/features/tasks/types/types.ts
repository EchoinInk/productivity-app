import type { DateKey } from "@/shared/lib/date";

/**
 * ---------------------------------------
 * CORE TYPES
 * ---------------------------------------
 */

export type EntityId = string;

export type TaskCategory =
  | "Home & Household"
  | "Health & Wellness"
  | "Career Development"
  | "Errands & Life Admin"
  | "Family & Relationships"
  | "Finances";

export type TaskRecurrence = "none" | "weekly" | "monthly";

/**
 * ---------------------------------------
 * TASK ENTITY
 * ---------------------------------------
 */

export interface Task {
  id: EntityId;

  label: string;

  /**
   * Primary scheduled date
   */
  date: DateKey;

  /**
   * Optional enhancements
   */
  time?: string;
  category?: TaskCategory;
  recurrence?: TaskRecurrence;
  notes?: string;

  /**
   * Completion tracking per day
   */
  completedDates: DateKey[];

  /**
   * ISO string (Date.toISOString())
   */
  createdAt: string;
}

/**
 * ---------------------------------------
 * INPUT TYPES
 * ---------------------------------------
 */

export interface CreateTaskInput {
  label: string;
  date: DateKey;

  time?: string;
  recurrence?: TaskRecurrence;
  category?: TaskCategory;
  notes?: string;
}

/**
 * ---------------------------------------
 * STORE STATE
 * ---------------------------------------
 */

export interface TasksState {
  tasks: Task[];

  addTask: (input: CreateTaskInput) => void;

  toggleTask: (id: EntityId, date: DateKey) => void;

updateTask: (id: EntityId, updates: Partial<Task>) => void;

  deleteTask: (id: EntityId) => void;
}