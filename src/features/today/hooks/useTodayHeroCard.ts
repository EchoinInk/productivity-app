import { useMemo } from "react";

interface UseTodayHeroCardProps {
  percentage: number;
  total: number;
  completed: number;
}

export const useTodayHeroCard = ({
  percentage,
  total,
  completed,
}: UseTodayHeroCardProps) => {
  const remaining = Math.max(0, total - completed);

  const { progressText, motivation } = useMemo(() => {
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
  }, [total, completed, remaining]);

  return {
    percentage,
    total,
    remaining,
    progressText,
    motivation,
  };
};
