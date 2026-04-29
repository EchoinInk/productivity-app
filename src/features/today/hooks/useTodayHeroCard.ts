import { useMemo } from "react";

interface CategorySummary {
  category: string;
  active: number;
  total: number;
  completed: number;
}

interface UseTodayHeroCardProps {
  percentage: number;
  total: number;
  completed: number;
  categories?: CategorySummary[];
}

export const useTodayHeroCard = ({
  percentage,
  total,
  completed,
  categories = [],
}: UseTodayHeroCardProps) => {
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

  return {
    percentage,
    total,
    progressText,
    motivation,
    visibleCategories,
  };
};
