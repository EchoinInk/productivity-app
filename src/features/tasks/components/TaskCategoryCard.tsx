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
}

const listRow = "flex items-center gap-4 pl-1";

const TaskCategoryCard = ({ data = [], onViewAll }: Props) => {
  const isEmpty = data.length === 0;

  return (
    <Card variant="default">
      <CardHeader title="Tasks by category">
        {onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="active:scale-95 transition"
          >
            <UIText.CTA tone="accent">View all →</UIText.CTA>
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
          <ul className="space-y-3">
            {data.map((item) => {
              const percent =
                item.total === 0
                  ? 0
                  : Math.round((item.completed / item.total) * 100);

              // ✅ FIXED: inside map
              const { bg, icon } = getCategoryMetadata(item.category);

              return (
                <li key={item.category} className={listRow}>
                  {/* ICON (no background) */}

                  <img
                    src={icon}
                      alt ={item.category}
                    className="w-10 h-10 shrink-0 object-contain"
                  />

                  {/* TEXT */}
                  <div className="flex-1 min-w-0">
                    <UIText.Body weight="medium" truncate>
                      {item.category}
                    </UIText.Body>

                    <UIText.BodyMutedS>
                      {item.completed}/{item.total} completed
                    </UIText.BodyMutedS>
                  </div>

                  {/* PROGRESS */}
                  <div className="w-20 h-2 rounded-full bg-muted overflow-hidden shrink-0">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
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
