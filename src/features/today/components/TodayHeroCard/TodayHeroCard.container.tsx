import { TodayHeroCardView, type TodayHeroCardViewModel } from "./TodayHeroCard.view";
import { useTodayHeroCard } from "../../hooks/useTodayHeroCard";

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
  const cardData = useTodayHeroCard({ percentage, total, completed, categories });

  const model: TodayHeroCardViewModel = {
    ...cardData,
    onAddTask,
    onViewAll,
    onCategoryClick,
    isLoading,
  };

  return <TodayHeroCardView model={model} />;
};

export default TodayHeroCard;
