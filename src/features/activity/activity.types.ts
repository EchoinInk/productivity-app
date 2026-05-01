export type ActivityType =
  | "task_created"
  | "task_completed"
  | "expense_added"
  | "meal_logged"
  | "shopping_item_added";

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  label: string;
  timestamp: number;
  metadata?: Record<string, any>;
}
