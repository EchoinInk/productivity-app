import EmptyState from "@/components/ui/EmptyState";
import { Card } from "@/components/ui/Card";
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
    <Card>
      <div className="flex items-center justify-between mb-3">
        <UIText.Title>Tasks by category</UIText.Title>

        {onViewAll && (
          <button type="button" onClick={onViewAll}>
            <UIText.Highlight>View All →</UIText.Highlight>
          </button>
        )}
      </div>

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

            return (
              <li
                key={item.category}
                className="flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <UIText.Micro>
                    {item.category}
                  </UIText.Micro>

                  <UIText.Meta className="italic">
                    {item.completed}/{item.total} completed
                  </UIText.Meta>
                </div>

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
