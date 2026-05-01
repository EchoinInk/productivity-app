import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Heading, Body, BodyMuted, CTA } from "@/components/ui/Text";
import { EmptyState } from "@/components/ui/EmptyState";
import { ListItemCard } from "@/components/ui/ListItemCard";
import { getCategoryMetadata } from "@/features/tasks/api";
import type { TaskRowVM } from "@/features/tasks/hooks/useTasks";
import type { DateKey } from "@/shared/lib/date";

interface UpNextListProps {
  tasks: TaskRowVM[];
  today: DateKey;
  onToggle: (id: string, date: DateKey) => void;
}

export const UpNextList = ({ tasks, today, onToggle }: UpNextListProps) => {
  const navigate = useNavigate();

  const upNext = useMemo(() => {
    const active = tasks.filter((t) => !t.isCompleted);
    return active
      .sort((a, b) => {
        if (a.time && b.time) return a.time.localeCompare(b.time);
        if (a.time) return -1;
        if (b.time) return 1;
        return a.title.localeCompare(b.title);
      })
      .slice(0, 3);
  }, [tasks]);

  return (
    <section className="space-y-4 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Heading as="h3" className="text-base text-muted-foreground">Up Next</Heading>

        <button
          type="button"
          onClick={() => navigate("/tasks")}
          className="active:scale-95 transition rounded-md px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="View all tasks"
        >
          <CTA className="text-muted-foreground/70 text-sm">View all</CTA>
        </button>
      </div>

      {/* Content */}
      {upNext.length === 0 ? (
        <div className="animate-[fadeIn_0.8s_ease-out]">
          <EmptyState
            title="Nothing scheduled"
            description="Enjoy your day 🎉"
            className="py-8"
          />
        </div>
      ) : (
        <ul className="space-y-3">
          {upNext.map((task) => {
            const meta = getCategoryMetadata(task.category ?? undefined);

            return (
              <ListItemCard
                key={task.id}
                variant="glass"
                className="flex items-center gap-3"
              >
                {/* Checkbox */}
                <button
                  type="button"
                  onClick={() => onToggle(task.id, today)}
                  aria-label={`Mark ${task.title} as completed`}
                  role="checkbox"
                  aria-checked={false}
                  className="
                    shrink-0
                    w-5 h-5
                    rounded-full
                    border-2 border-muted-foreground/40
                    hover:border-primary
                    active:scale-90
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                  "
                />

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <Body weight="semibold" truncate className="text-muted-foreground">
                    {task.title}
                  </Body>

                  {task.time && (
                    <BodyMuted className="text-xs mt-1 text-muted-foreground/70">
                      {task.time}
                    </BodyMuted>
                  )}
                </div>

                {/* Category pill */}
                {task.category && (
                  <span
                    className="
                      shrink-0
                      px-3 py-1
                      rounded-full
                      text-xs font-medium
                      opacity-70
                      flex items-center gap-1.5
                    "
                    style={{
                      backgroundColor: meta.bg,
                      color: meta.text,
                    }}
                  >
                    <img
                      src={meta.icon}
                      alt=""
                      className="w-3 h-3 object-contain"
                    />
                    {task.category}
                  </span>
                )}
              </ListItemCard>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default UpNextList;
