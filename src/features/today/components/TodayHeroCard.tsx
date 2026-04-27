import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import { UIText } from "@/components/ui/Text";
import EmptyState from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import clipboardIllustration from "@/assets/3d-clipboard.png";
import { getCategoryMetadata } from "@/features/tasks/constants/categories";

interface CategorySummary {
  category: string;
  active: number;
  total: number;
  completed: number;
}

interface Props {
  percentage: number;
  total: number;
  completed: number;
  categories?: CategorySummary[];
  onAddTask?: () => void;
  onViewAll?: () => void;
  onCategoryClick?: (category: string) => void;
  isLoading?: boolean;
}

const TodayHeroCard = ({
  percentage,
  total,
  completed,
  categories = [],
  onAddTask,
  onViewAll,
  onCategoryClick,
  isLoading = false,
}: Props) => {
  const radius = 36;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const remaining = Math.max(0, total - completed);
  const progressText =
    total === 0 ? "No tasks today" : `${completed} of ${total} completed`;
  const motivation =
    total === 0
      ? null
      : remaining === 0
      ? "Nothing left on your list 🩶"
      : "You're making progress ✨";

  const visibleCategories = categories.filter(
    (c) => c.total > 0 && c.completed < c.total
  );

  return (
    <Card variant="hero" className="overflow-hidden p-0">
      {/* TOP — gradient hero */}
      <div className="flex items-center gap-4 p-5">
        {/* Progress ring */}
        <div className="relative shrink-0 h-[84px] w-[84px]">
          <svg viewBox="0 0 72 72" className="w-full h-full">
            <circle
              stroke="rgba(255,255,255,0.25)"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="white"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
                transition: "stroke-dashoffset 0.4s ease",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <UIText.Heading className="text-white">{percentage}%</UIText.Heading>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <UIText.HeroTitle className="text-white">
            Today's Tasks
          </UIText.HeroTitle>
          <UIText.HeroSubtext className="text-white/90">
            {progressText}
          </UIText.HeroSubtext>
          {total === 0 ? (
            <button
              onClick={onAddTask}
              className="self-start mt-2 px-4 py-1.5 rounded-full bg-white text-primary text-xs font-semibold shadow-sm hover:bg-white/90 active:scale-[0.98] transition"
            >
              Add a task →
            </button>
          ) : (
            motivation && (
              <UIText.HeroSupport className="text-white/85 mt-0.5">
                {motivation}
              </UIText.HeroSupport>
            )
          )}
        </div>

        {/* Illustration */}
        <img
          src={clipboardIllustration}
          alt=""
          aria-hidden
          className="shrink-0 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.12)]"
          style={{ width: "6.5rem", height: "6.5rem" }}
        />
      </div>

      {/* BOTTOM — neutral details */}
      <div className="bg-card/95 backdrop-blur-sm rounded-b-[inherit] px-5 pt-4 pb-5">
        <div className="flex items-center justify-between mb-2">
          <UIText.Heading as="h3">Tasks by category</UIText.Heading>
          {onViewAll && (
            <button
              type="button"
              onClick={onViewAll}
              className="active:scale-95 transition"
              aria-label="View all tasks"
            >
              <UIText.CTA tone="accent">View all →</UIText.CTA>
            </button>
          )}
        </div>

        {isLoading ? (
          <ul className="space-y-2">
            {[0, 1, 2].map((i) => (
              <li key={i} className="flex items-center gap-3 py-2">
                <Skeleton className="w-9 h-9 rounded-lg" />
                <Skeleton className="h-4 flex-1 max-w-[60%]" />
                <Skeleton className="h-3 w-12" />
              </li>
            ))}
          </ul>
        ) : visibleCategories.length === 0 ? (
          <EmptyState
            title="You're all caught up today"
            description="No tasks remaining"
            className="py-4"
          />
        ) : (
          <ul className="divide-y divide-border/40">
            {visibleCategories.map((item) => {
              const left = item.total - item.completed;
              const { icon } = getCategoryMetadata(item.category);
              return (
                <li
                  key={item.category}
                  onClick={() => onCategoryClick?.(item.category)}
                  role="button"
                  aria-label={`View ${item.category} tasks`}
                  className="flex items-center gap-3 py-2.5 rounded-lg hover:bg-muted/40 active:scale-[0.99] transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-muted/60 flex items-center justify-center shrink-0">
                    <img src={icon} alt="" className="w-6 h-6 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <UIText.Body weight="semibold" truncate>
                      {item.category}
                    </UIText.Body>
                  </div>
                  <UIText.BodyMutedS
                    className={
                      left <= 1
                        ? "shrink-0 text-[hsl(var(--warning))] font-medium"
                        : "shrink-0"
                    }
                  >
                    {left} left
                  </UIText.BodyMutedS>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Card>
  );
};

export default TodayHeroCard;
