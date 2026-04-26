import EmptyState from "@/components/ui/EmptyState";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { UIText } from "@/components/ui/Text";

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

const TaskCategoryCard = ({ data = [], onViewAll }: Props) => {
  const isEmpty = data.length === 0;

  return (
    <Card variant="default">
      <CardHeader title="Tasks by category">
        {onViewAll && (
          <button type="button" onClick={onViewAll} className="active:scale-95 transition">
            <UIText.CTA tone="accent">View all →</UIText.CTA>
          </button>
        )}
      </CardHeader>
      <CardBody>
        {isEmpty ? (
          <EmptyState title="No tasks today" description="You're all caught up" className="py-6" />
        ) : (
          <ul className="space-y-3">
            {data.map((item) => {
              const percent =
                item.total === 0 ? 0 : Math.round((item.completed / item.total) * 100);

              return (
                <li key={item.category} className="flex items-center gap-3">
                  {/* Soft circle icon placeholder */}
                  <span
                    aria-hidden
                    className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0"
                  >
                    <span className="w-3 h-3 rounded-full bg-primary/70" />
                  </span>

                  <div className="flex-1 min-w-0">
                    <UIText.Body weight="medium" truncate>
                      {item.category}
                    </UIText.Body>
                    <UIText.BodyMuted>
                      {item.completed}/{item.total} completed
                    </UIText.BodyMuted>
                  </div>

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
