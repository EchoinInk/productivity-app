import EmptyState from "@/components/ui/EmptyState";
import { Card } from "@/components/ui/Card";

interface CategorySummary {
  category: string;
  active: number;
  total: number;
  completed: number;
}

interface Props {
  data: CategorySummary[];
  onViewAll?: () => void;
}

const TaskCategoryCard = ({ data, onViewAll }: Props) => {
  const isEmpty = data.length === 0;

  return (
    <Card className="p-4">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-foreground">
          Tasks by category
        </h2>

        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm font-medium text-primary"
          >
            View All →
          </button>
        )}
      </div>

      {/* CONTENT */}
      {isEmpty ? (
        <div className="flex items-center justify-center py-8">
          <EmptyState
            title="No tasks today"
            description="You're all caught up"
          />
        </div>
      ) : (
        <ul className="space-y-3">
          {data.map((item) => {
            const percent =
              item.total === 0
                ? 0
                : Math.round((item.completed / item.total) * 100);

            return (
              <li
                key={item.category}
                className="flex items-center justify-between"
              >
                {/* LEFT */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {item.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.completed}/{item.total} completed
                  </span>
                </div>

                {/* RIGHT — PROGRESS BAR */}
                <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
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
    </Card>
  );
};

export default TaskCategoryCard;