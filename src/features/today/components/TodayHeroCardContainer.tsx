import { useMemo } from "react";
import { TodayHeroCardView } from "./TodayHeroCardView";

interface CategorySummary {
  category: string;
  active: number;
  total: number;
  completed: number;
}

interface TodayHeroCardProps {
  percentage: number;
  total: number;
  completed: number;
  categories?: CategorySummary[];
  onAddTask?: () => void;
  onViewAll?: () => void;
  onCategoryClick?: (category: string) => void;
  isLoading?: boolean;
}

export const TodayHeroCard = ({
  percentage,
  total,
  completed,
  categories = [],
  onAddTask,
  onViewAll,
  onCategoryClick,
  isLoading = false,
}: TodayHeroCardProps) => {
  const { progressText, motivation } = useMemo(() => {
    const remaining = Math.max(0, total - completed);
    return {
      progressText:
        total === 0 ? "No tasks today" : `${completed} of ${total} completed`,
      motivation:
        total === 0
          ? null
          : remaining === 0
          ? "Nothing left on your list 🩶"
          : "You're making progress ✨",
    };
  }, [total, completed]);

  const visibleCategories = useMemo(
    () => categories.filter((c) => c.total > 0 && c.completed < c.total),
    [categories],
  );

  return (
    <TodayHeroCardView
      percentage={percentage}
      total={total}
      progressText={progressText}
      motivation={motivation}
      visibleCategories={visibleCategories}
      onAddTask={onAddTask}
      onViewAll={onViewAll}
      onCategoryClick={onCategoryClick}
      isLoading={isLoading}
    />
  );
};

export default TodayHeroCard;
