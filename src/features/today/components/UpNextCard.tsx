import { ChevronRight } from "lucide-react";
import { Body, Meta } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { getCategoryMetadata } from "@/features/tasks/api";
import { getColorClasses } from "@/shared/lib/colorMapper";
import type { Task } from "@/features/tasks/types/types";

interface UpNextCardProps {
  task: Task | null;
  onPress?: () => void;
}

export const UpNextCard = ({ task, onPress }: UpNextCardProps) => {
  if (!task) {
    return (
      <Card variant="glass" className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
            <span className="text-2xl">🎉</span>
          </div>
          <div className="flex-1">
            <Body className="font-medium">No tasks for today</Body>
            <Meta tone="muted">Enjoy your free day!</Meta>
          </div>
        </div>
      </Card>
    );
  }

  const meta = getCategoryMetadata(task.category ?? undefined);
  const classes = getColorClasses(meta.bg);

  return (
    <button
      type="button"
      onClick={onPress}
      className="w-full text-left active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-transform duration-150 ease-out"
    >
      <Card variant="glass" className="p-4">
        <div className="flex items-center gap-3">
          {/* Left: Icon */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${classes.bg}`}
          >
            <img
              src={meta.icon}
              alt=""
              width={24}
              height={24}
              loading="lazy"
              decoding="async"
              className="w-6 h-6 object-contain"
            />
          </div>

          {/* Middle: Title + Subtitle */}
          <div className="flex-1 min-w-0">
            <Body className="font-medium truncate">{task.label}</Body>
            {task.time && (
              <Meta tone="muted" className="mt-0.5">
                {task.time}
              </Meta>
            )}
            {task.category && !task.time && (
              <Meta tone="muted" className="mt-0.5">
                {task.category}
              </Meta>
            )}
          </div>

          {/* Right: Chevron */}
          <ChevronRight size={20} className="text-muted/70 shrink-0" />
        </div>
      </Card>
    </button>
  );
};

export default UpNextCard;
