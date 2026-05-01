import { ActivityEvent } from "./activity.types";

export const createActivityEvent = (
  type: ActivityEvent["type"],
  label: string,
  metadata?: Record<string, any>
): ActivityEvent => ({
  id: crypto.randomUUID(),
  type,
  label,
  timestamp: Date.now(),
  metadata,
});
