import EmptyState from "@/components/ui/EmptyState";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { UIText } from "@/components/ui/Text";
import { getCategoryMetadata } from "@/features/tasks/api";

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

  return (
    <Card variant="default">
      <CardHeader title="Tasks by category">
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="active:scale-95 transition"
            aria-label="View all tasks"
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
          <ul className="divide-y divide-muted/10">
            {data
              .filter(
                (item) =>
                  item.total > 0 && item.completed < item.total
              )
              .map((item) => {
                const remaining = item.total - item.completed;
                const { icon } = getCategoryMetadata(item.category);

                return (
                  <li
                    key={item.category}
                    className={listRow}
                    onClick={() => onCategoryClick?.(item.category)}
                    role="button"
                    aria-label={`View ${item.category} tasks`}
                  >
                    {/* ICON */}
                    <div className="w-9 h-9 rounded-lg bg-muted/20 flex items-center justify-center shrink-0">
                      <img
                        src={icon}
                        alt=""
                        className="w-6 h-6 object-contain"
                      />
                    </div>

                    {/* CATEGORY NAME */}
                    <div className="flex-1 min-w-0">
                      <UIText.Body weight="semibold" truncate>
                        {item.category}
                      </UIText.Body>
                    </div>

                    {/* TASKS LEFT */}
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
        )}
      </CardBody>
    </Card>
  );
};

export default TaskCategoryCard;