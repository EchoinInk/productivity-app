import { formatTaskDateTime } from "@/shared/lib/date";

import type { Task } from "@/features/tasks/types";

/**
 * ---------------------------------------
 * FORMATTING DOMAIN
 * ---------------------------------------
 *
 * Presentation-agnostic string builders that
 * keep formatting logic out of components.
 */

export const buildTaskSubtitle = (task: Task): string =>
  [task.notes, formatTaskDateTime(task.date, task.time)]
    .filter(Boolean)
    .join(" • ");
