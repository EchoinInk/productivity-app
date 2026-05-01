import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Heading, Body, BodyMuted, CTA } from "@/components/ui/Text";
import { EmptyState } from "@/components/ui/EmptyState";
import { ListItemCard } from "@/components/ui/ListItemCard";
import { getCategoryMetadata } from "@/features/tasks/api";
import type { Task } from "@/features/tasks/types/types";

interface UpNextListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
}

export const UpNextList = ({ tasks, onToggle }: UpNextListProps) => {
  const navigate = useNavigate();

  const upNext = useMemo(() => {
    const active = tasks.filter((t) => !t.completed);
    return active
      .sort((a, b) => {
        if (a.time && b.time) return a.time.localeCompare(b.time);
        if (a.time) return -1;
        if (b.time) return 1;
        return a.label.localeCompare(b.label);
      })
      .slice(0, 3);
  }, [tasks]);

  const handleToggle = useCallback((taskId: string) => {
    onToggle(taskId);
  }, [onToggle]);

  return (
    <section className="space-y-4 mt-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Heading as="h3" className="text-base text-muted-foreground">Up Next</Heading>

        <button
          type="button"
          onClick={() => navigate("/tasks")}
          className="active:scale-95 transition rounded-md px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="View all tasks"
        >
          <CTA className="text-muted-foreground/90 text-sm">View all</CTA>
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
                className={`flex items-center gap-3 transition-all duration-300 ${task.completed ? 'opacity-60' : ''}`}
              >
                {/* Checkbox */}
                <button
                  type="button"
                  onClick={() => handleToggle(task.id)}
                  aria-label={`${task.completed ? 'Mark' : 'Unmark'} ${task.label} as ${task.completed ? 'incomplete' : 'completed'}`}
                  role="checkbox"
                  aria-checked={task.completed}
                  className={`
                    shrink-0
                    w-5 h-5
                    rounded-full
                    border-2
                    transition-all duration-200
                    active:scale-90
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                    ${
                      task.completed
                        ? 'bg-primary border-primary'
                        : 'border-muted-foreground/40 hover:border-primary'
                    }
                  `}
                >
                  {task.completed && (
                    <svg
                      viewBox="0 0 12 12"
                      className="w-3 h-3 text-primary-foreground"
                      fill="currentColor"
                    >
                      <path d="M3.5 6L5 7.5L8.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  )}
                </button>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <Body 
                    weight="semibold" 
                    truncate 
                    className={task.completed ? "text-muted-foreground/70 line-through" : "text-muted-foreground"}
                  >
                    {task.label}
                  </Body>

                  {task.time && (
                    <BodyMuted className="text-xs mt-1 text-muted-foreground/90">
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
                      opacity-90
                      flex items-center gap-1
                    "
                    style={{
                      backgroundColor: meta.bg,
                      color: meta.text,
                    }}
                  >
                    <img
                      src={meta.icon}
                      alt=""
                      width={12}
                      height={12}
                      loading="lazy"
                      decoding="async"
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
