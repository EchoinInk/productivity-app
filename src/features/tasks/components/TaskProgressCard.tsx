import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { UIText } from "@/components/ui/Text";
import { getCategoryMetadata } from "@/features/tasks/constants/categories";

interface CategorySummary {
  category: string;
  total: number;
  completed: number;
}

interface Props {
  data: CategorySummary[];
  onCategoryClick?: (category: string) => void;
  onViewAll?: () => void;
}

const TodayFocusCard = ({ data, onCategoryClick, onViewAll }: Props) => {
  const totalTasks = data.reduce((sum, item) => sum + item.total, 0);
  const completedTasks = data.reduce((sum, item) => sum + item.completed, 0);
  const percent =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // 🎯 Smart sorting → most urgent first
  const priorities = data
    .filter((item) => item.total > 0 && item.completed < item.total)
    .sort(
      (a, b) =>
        (b.total - b.completed) - (a.total - a.completed)
    )
    .slice(0, 4);

  return (
    <Card variant="default">
      {/* HEADER */}
      <CardHeader title="Today focus">
        <div className="text-xs px-2 py-1 rounded-full bg-muted/40">
          ✨ Smart
        </div>
      </CardHeader>

      <CardBody className="space-y-5">
        {/* PROGRESS SECTION */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-200/40 via-blue-200/30 to-pink-200/40 p-4 flex items-center gap-4">
          
          {/* Progress Circle */}
          <div className="relative w-16 h-16 shrink-0">
            <div className="w-full h-full rounded-full border-[6px] border-muted/30" />
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full border-[6px] border-primary"
              style={{
                clipPath: `inset(${100 - percent}% 0 0 0)`
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
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
            <UIText.BodyMutedS className="text-xs mt-1">
              You're making great progress ✨
            </UIText.BodyMutedS>
          </div>

          {/* Optional icon */}
          <div className="text-3xl opacity-60">📋</div>
        </div>

        {/* PRIORITIES HEADER */}
        <div>
          <UIText.Body weight="semibold">
            ⚡ Your top priorities
          </UIText.Body>
          <UIText.BodyMutedS className="text-xs">
            Focus on these first
          </UIText.BodyMutedS>
        </div>

        {/* PRIORITY LIST */}
        <ul className="space-y-2">
          {priorities.map((item, index) => {
            const remaining = item.total - item.completed;
            const { icon } = getCategoryMetadata(item.category);

            return (
              <li
                key={item.category}
                onClick={() => onCategoryClick?.(item.category)}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 hover:bg-muted/30 active:scale-[0.98] transition cursor-pointer"
              >
                {/* Rank */}
                <div className="w-6 h-6 text-xs rounded-full bg-primary/10 flex items-center justify-center font-medium">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center">
                  <img src={icon} className="w-6 h-6" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <UIText.Body weight="medium" truncate>
                    {item.category}
                  </UIText.Body>
                  <UIText.BodyMutedS className="text-xs">
                    {item.completed}/{item.total} done
                  </UIText.BodyMutedS>
                </div>

                {/* Remaining */}
                <UIText.Body
                  className={`text-sm ${
                    remaining <= 1
                      ? "text-amber-600 font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {remaining} left
                </UIText.Body>

                {/* Arrow */}
                <div className="text-muted-foreground">›</div>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="w-full py-3 rounded-xl bg-muted/30 hover:bg-muted/40 transition text-sm font-medium"
          >
            View all tasks →
          </button>
        )}
      </CardBody>
    </Card>
  );
};

export default TodayFocusCard;