import { TodayHeroCardView, type TodayHeroCardViewModel } from "./TodayHeroCard.view";
import { useTodayHeroCard } from "../../hooks/useTodayHeroCard";

interface TodayHeroCardProps {
  percentage: number;
  total: number;
  completed: number;
  onAddTask?: () => void;
  isLoading?: boolean;
}

export const TodayHeroCard = ({
  percentage,
  total,
  completed,
  onAddTask,
  isLoading = false,
}: TodayHeroCardProps) => {
  const cardData = useTodayHeroCard({ percentage, total, completed });

  const model: TodayHeroCardViewModel = {
    ...cardData,
    onAddTask,
    isLoading,
  };

  return <TodayHeroCardView model={model} />;
};
