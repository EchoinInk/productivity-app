import clsx from "clsx";
import { motion } from "framer-motion";
import { memo } from "react";

import { CheckboxRow } from "@/components/ui/CheckboxRow";
import { ListItemBase } from "@/components/ui/ListItemBase";
import { UIText } from "@/components/ui/Text";

import { getCategoryMetadata } from "@/features/tasks/constants/categories";
import {
  buildTaskSubtitle,
  isTaskCompletedOn,
} from "@/features/tasks/domain";

import type { EntityId, Task } from "@/features/tasks/types";
import type { DateKey } from "@/shared/lib/date";

interface TaskRowProps {
  task: Task;
  activeDate: DateKey;
  onToggleTask: (id: EntityId, date: DateKey) => void;
  onSelectTask: (task: Task) => void;
}

/**
 * Purely presentational task row.
 * All derivations come from the domain layer.
 */
export const TaskRow = memo(
  ({ task, activeDate, onToggleTask, onSelectTask }: TaskRowProps) => {
    const done = isTaskCompletedOn(task, activeDate);
    const style = getCategoryMetadata(task.category);
    const subtitle = buildTaskSubtitle(task);

    return (
      <motion.div
        layout
        layoutId={String(task.id)}
        initial={false}
        animate={{
          opacity: done ? 0.6 : 1,
          scale: done ? 0.98 : 1,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
      >
        <CheckboxRow
          checked={done}
          onToggle={() => onToggleTask(task.id, activeDate)}
          onClick={() => onSelectTask(task)}
          className="
            rounded-lg
            px-2 py-2
            transition-all duration-200
            active:scale-[0.98]
          "
        >
          <ListItemBase
            left={
              task.category && (
                <div
                  className="w-1 h-full rounded-full"
                  style={{ backgroundColor: style.text }}
                />
              )
            }
            label={
              <UIText.Body
                className={clsx(
                  "font-medium transition-all",
                  done && "opacity-50 line-through",
                )}
                style={{ color: style.text }}
              >
                {task.label}
              </UIText.Body>
            }
            subtitle={
              <>
                {subtitle && (
                  <UIText.Meta className="text-muted-foreground">
                    {subtitle}
                  </UIText.Meta>
                )}

                {task.category && (
                  <span
                    className="
                      inline-flex items-center
                      mt-1
                      px-2.5 py-0.5
                      rounded-full
                      text-[11px] font-medium
                    "
                    style={{
                      backgroundColor: style.bg,
                      color: style.text,
                    }}
                  >
                    {task.category}
                  </span>
                )}
              </>
            }
          />
        </CheckboxRow>
      </motion.div>
    );
  },
);

TaskRow.displayName = "TaskRow";
