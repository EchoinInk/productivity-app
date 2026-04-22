import type { DateKey } from "@/shared/lib/date";

export type EntityId = string | number;

export type TaskCategory =
  | "Home & Household"
  | "Health & Wellness"
  | "Career Development"
  | "Errands & Life Admin"
  | "Family & Relationships"
  | "Finances";

export type TaskRecurrence = "none" | "weekly" | "monthly";

export interface Task {
  id: EntityId;
  label: string;
  date: DateKey;
  category?: TaskCategory;
  recurrence?: TaskRecurrence;
  completedDates: DateKey[];
  time?: string;
  notes?: string;
}

export interface CreateTaskInput {
  label: string;
  date: DateKey;
  time?: string;
  recurrence?: TaskRecurrence;
  category?: TaskCategory;
  notes?: string;
}
