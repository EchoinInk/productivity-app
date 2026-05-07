/**
 * Today Focus Card — single dominant focal point.
 * Combines daily progress, the next task, and the primary CTA into
 * one dense, high-signal surface.
 */
import { memo, useCallback } from "react";
import { ArrowRight, Check, Plus } from "lucide-react";
import { Surface } from "@/components/ui/Surface";
import { Text } from "@/components/ui/Text";
import { getCategoryMetadata } from "@/features/tasks/domain/taskDomain";
import type { Task } from "@/features/tasks/types/types";

export interface TodayFocusCardProps {
  percentage: number;
  total: number;
  completed: number;
  remaining: number;
  nextTask: Task | null;
  onAddTask: () => void;
  onCompleteNext: () => void;
}

const formatDate = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

export const TodayFocusCard = memo(
  ({
    percentage,
    total,
    completed,
    remaining,
    nextTask,
    onAddTask,
    onCompleteNext,
  }: TodayFocusCardProps) => {
    const isEmpty = total === 0;
    const isDone = !isEmpty && remaining === 0;

    const handleComplete = useCallback(() => {
      if (nextTask) onCompleteNext();
    }, [nextTask, onCompleteNext]);

    const meta = nextTask ? getCategoryMetadata(nextTask.category) : null;

    return (
      <Surface
        variant="default"
        padding="none"
        radius="lg"
        className="w-full overflow-hidden"
      >
        {/* HEADER ROW — date + progress score */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-muted">
              Today
            </span>
            <span className="text-[11px] text-text-muted">·</span>
            <span className="text-[11px] text-text-muted">{formatDate()}</span>
          </div>
          <div className="flex items-baseline gap-1 tabular-nums">
            <Text size="sm" weight="semibold" tone="primary">
              {completed}
            </Text>
            <Text size="xs" tone="muted">
              / {total} done
            </Text>
          </div>
        </div>

        {/* PROGRESS BAR — slim, sharp */}
        <div className="px-4">
          <div className="h-1 w-full bg-surface-inset rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-[width] duration-500 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
            />
          </div>
        </div>

        {/* NEXT TASK ROW — the dominant focal element */}
        <div className="px-4 pt-4 pb-4">
          {isEmpty ? (
            <button
              type="button"
              onClick={onAddTask}
              className="group w-full flex items-center justify-between rounded-lg bg-surface-elevated hover:bg-surface px-3 py-3 transition-colors active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Plus size={18} strokeWidth={2.5} />
                </div>
                <div className="text-left">
                  <Text size="sm" weight="semibold" tone="primary">
                    Plan your day
                  </Text>
                  <Text size="xs" tone="muted" className="mt-0.5">
                    Add your first task
                  </Text>
                </div>
              </div>
              <ArrowRight size={16} className="text-text-muted group-hover:text-text-primary transition-colors" />
            </button>
          ) : isDone ? (
            <div className="flex items-center justify-between rounded-lg bg-success/10 px-3 py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-success/15 text-success flex items-center justify-center">
                  <Check size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <Text size="sm" weight="semibold" tone="primary">
                    All clear for today
                  </Text>
                  <Text size="xs" tone="muted" className="mt-0.5">
                    {completed} {completed === 1 ? "task" : "tasks"} completed
                  </Text>
                </div>
              </div>
              <button
                type="button"
                onClick={onAddTask}
                className="text-xs font-medium text-primary hover:underline"
              >
                Add more
              </button>
            </div>
          ) : nextTask ? (
            <div className="flex items-stretch gap-2">
              {/* Complete checkbox — large primary affordance */}
              <button
                type="button"
                onClick={handleComplete}
                aria-label={`Complete ${nextTask.label}`}
                className="shrink-0 w-11 rounded-lg border border-border bg-surface-elevated hover:bg-primary/10 hover:border-primary/40 hover:text-primary text-text-muted transition-colors flex items-center justify-center active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                <Check size={18} strokeWidth={2.5} />
              </button>

              {/* Task body */}
              <div className="flex-1 min-w-0 rounded-lg bg-surface-elevated px-3 py-2.5 flex items-center gap-3">
                {meta && (
                  <img
                    src={meta.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain shrink-0 opacity-90"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <Text
                    size="sm"
                    weight="semibold"
                    tone="primary"
                    className="truncate"
                  >
                    {nextTask.label}
                  </Text>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Text size="xs" tone="muted" className="truncate">
                      Up next
                      {nextTask.category ? ` · ${nextTask.category}` : ""}
                    </Text>
                    {nextTask.time && (
                      <span className="text-[11px] tabular-nums text-text-secondary font-medium">
                        {nextTask.time}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Footer meta — remaining count */}
          {!isEmpty && !isDone && (
            <div className="mt-3 flex items-center justify-between">
              <Text size="xs" tone="muted">
                {remaining} {remaining === 1 ? "task" : "tasks"} left ·{" "}
                {percentage}% complete
              </Text>
              <button
                type="button"
                onClick={onAddTask}
                className="text-xs font-medium text-primary hover:underline"
              >
                + Add task
              </button>
            </div>
          )}
        </div>
      </Surface>
    );
  },
);

TodayFocusCard.displayName = "TodayFocusCard";
export default TodayFocusCard;
