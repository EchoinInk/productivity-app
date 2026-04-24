import { formatTaskDateTime } from "@/shared/lib/date";

import type { Task } from "@/features/tasks/types";

/**
 * ---------------------------------------
 * TASK FORMATTING (presentation helpers)
 * ---------------------------------------
 *
 * Lives in /shared/lib (not /features/tasks/domain)
 * because formatting is a presentation concern,
 * not business logic. Domain functions stay pure
 * and free of any string/UI shaping.
 */

export const buildTaskSubtitle = (task: Task): string =>
  [task.notes, formatTaskDateTime(task.date, task.time)]
    .filter(Boolean)
    .join(" • ");
