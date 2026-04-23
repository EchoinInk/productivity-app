import clsx from "clsx";
import EmptyState from "@/components/ui/EmptyState";

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
  return (
    <section className="rounded-2xl bg-card shadow-sm p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
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

      {/* Content */}
      {data.length === 0 ? (
        <EmptyState
          title="No tasks today"
          description="You're all caught up"
        />
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
                {/* Left */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {item.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.completed}/{item.total} completed
                  </span>
                </div>

                {/* Right (progress ring simplified to bar for now) */}
                <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default TaskCategoryCard;