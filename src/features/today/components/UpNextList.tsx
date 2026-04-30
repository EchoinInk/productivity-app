import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Heading, Body, BodyMuted, CTA } from "@/components/ui/Text";
import { EmptyState } from "@/components/ui/EmptyState";
import { getCategoryMetadata } from "@/features/tasks/api";
import type { TaskRowVM } from "@/features/tasks/hooks/useTasks";
import type { DateKey } from "@/shared/lib/date";

interface UpNextListProps {
  tasks: TaskRowVM[];
  today: DateKey;
  onToggle: (id: string, date: DateKey) => void;
}

// Pull a "HH:MM" prefix from a row subtitle if present.
const extractTime = (subtitle: string): string | null => {
  const match = subtitle.match(/\b(\d{1,2}:\d{2})\b/);
  return match && match[1] ? match[1] : null;
};

const formatTime = (raw: string): string => {
  const [hStr, mStr] = raw.split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  if (Number.isNaN(h) || Number.isNaN(m)) return raw;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = ((h + 11) % 12) + 1;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
};

export const UpNextList = ({ tasks, today, onToggle }: UpNextListProps) => {
  const navigate = useNavigate();

  const upNext = useMemo(() => {
    const active = tasks.filter((t) => !t.isCompleted);
    return active
      .map((t) => ({ ...t, _time: extractTime(t.subtitle) }))
      .sort((a, b) => {
        if (a._time && b._time) return a._time.localeCompare(b._time);
        if (a._time) return -1;
        if (b._time) return 1;
        return a.title.localeCompare(b.title);
      })
      .slice(0, 3);
  }, [tasks]);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <Heading as="h3">Up Next</Heading>
        <button
          type="button"
          onClick={() => navigate("/tasks")}
          className="active:scale-95 transition"
          aria-label="View all tasks"
        >
          <CTA tone="muted">View all</CTA>
        </button>
      </div>

      {upNext.length === 0 ? (
        <EmptyState
          title="Nothing scheduled"
          description="Enjoy your day 🎉"
          className="py-6"
        />
      ) : (
        <ul className="space-y-2">
          {upNext.map((task) => {
            const meta = getCategoryMetadata(task.category ?? undefined);
            const time = task._time ? formatTime(task._time) : null;
            return (
              <li
                key={task.id}
                className="flex items-center gap-3 rounded-2xl bg-card border border-muted/30 px-4 py-3 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => onToggle(task.id, today)}
                  aria-label={`Mark ${task.title} as completed`}
                  className="shrink-0 w-6 h-6 rounded-full border-2 border-muted-foreground/40 hover:border-primary active:scale-90 transition"
                />

                <div className="flex-1 min-w-0">
                  <Body weight="semibold" truncate>
                    {task.title}
                  </Body>
                  {time && <BodyMuted className="text-xs">{time}</BodyMuted>}
                </div>

                {task.category && (
                  <span
                    className="shrink-0 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: meta.bg, color: meta.text }}
                  >
                    {task.category}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default UpNextList;
