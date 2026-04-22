import type { EntityId } from "@/features/tasks/types";

export type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export interface Meal {
  id: EntityId;
  name: string;
  day: Weekday;
}

export interface CreateMealInput {
  name: string;
  day: Weekday;
}
