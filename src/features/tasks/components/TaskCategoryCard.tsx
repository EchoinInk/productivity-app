import EmptyState from "@/components/ui/EmptyState";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { UIText } from "@/components/ui/Text";
import { getCategoryMetadata } from "@/features/tasks/constants/categories";

interface CategorySummary {
  category: string;
  active: number;
  total: number;
  completed: number;
}

interface Props {
  data?: CategorySummary[];
  onViewAll?: () => void;
  onCategoryClick?: (category: string) => void;
}

const listRow =
  "flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-muted/30 active:scale-[0.98] transition-all cursor-pointer";

const TaskCategoryCard = ({
  data = [],
  onViewAll,
  onCategoryClick,
}: Props) => {
  const isEmpty = data.length === 0;

  // ✅ TOTAL PROGRESS
  const totalTasks = data.reduce((sum, i) => sum + i.total, 0);
  const completedTasks = data.reduce((sum, i) => sum + i.completed, 0);
  const percent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // ✅ SMART PRIORITIES (most remaining first)
  const priorities = data
    .filter((i) => i.total > 0 && i.completed < i.total)
    .sort(
      (a, b) =>
        (b.total - b.completed) - (a.total - a.completed)
    )
    .slice(0, 4);

  return (
    <Card variant="default">
      <CardHeader title="Today focus">
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="active:scale-95 transition"
          >
            <UIText.CTA tone="accent" className="opacity-90">
              View all →
            </UIText.CTA>
          </button>
        )}
      </CardHeader>

      <CardBody>
        {isEmpty ? (
          <EmptyState
            title="No tasks today"
            description="You're all caught up"
            className="py-6"
          />
        ) : (
          <div className="space-y-4">
            {/* 🔥 PROGRESS HEADER */}
            <div className="rounded-2xl bg-gradient-to-r from-purple-200/40 via-blue-200/30 to-pink-200/40 p-4 flex items-center gap-4">
              
              {/* Progress Circle */}
              <div className="relative w-14 h-14 shrink-0">
                <div className="w-full h-full rounded-full border-[5px] border-muted/30" />
                <div
                  className="absolute top-0 left-0 w-full h-full rounded-full border-[5px] border-primary"
                  style={{
                    clipPath: `inset(${100 - percent}% 0 0 0)`
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                  {percent}%
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <UIText.Body weight="semibold">
                  Keep it going!
                </UIText.Body>
                <UIText.BodyMutedS>
                  {completedTasks} of {totalTasks} completed
                </UIText.BodyMutedS>
              </div>

              <div className="text-xl opacity-60">✨</div>
            </div>

            {/* ⚡ PRIORITIES */}
            <div>
              <UIText.Body weight="semibold">
                Your top priorities
              </UIText.Body>
              <UIText.BodyMutedS className="text-xs">
                Focus on these first
              </UIText.BodyMutedS>
            </div>

            {/* LIST */}
            <ul className="space-y-2">
              {priorities.map((item, index) => {
                const remaining = item.total - item.completed;
                const { icon } = getCategoryMetadata(item.category);

                return (
                  <li
                    key={item.category}
                    className={listRow}
                    onClick={() => onCategoryClick?.(item.category)}
                  >
                    {/* RANK */}
                    <div className="w-5 h-5 text-xs rounded-full bg-primary/10 flex items-center justify-center font-medium">
                      {index + 1}
                    </div>

                    {/* ICON */}
                    <div className="w-9 h-9 rounded-lg bg-muted/20 flex items-center justify-center shrink-0">
                      <img
                        src={icon}
                        alt=""
                        className="w-6 h-6 object-contain"
                      />
                    </div>

                    {/* NAME */}
                    <div className="flex-1 min-w-0">
                      <UIText.Body weight="semibold" truncate>
                        {item.category}
                      </UIText.Body>
                    </div>

                    {/* REMAINING */}
                    <UIText.BodyMutedS
                      className={`shrink-0 text-sm ${
                        remaining <= 1
                          ? "text-amber-600 font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {remaining} left
                    </UIText.BodyMutedS>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default TaskCategoryCard;