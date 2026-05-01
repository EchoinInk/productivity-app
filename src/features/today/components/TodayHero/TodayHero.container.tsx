import { TodayHeroView, type TodayHeroViewModel } from "./TodayHero.view";
import { useTodayData } from "@/features/today/hooks/useTodayData";

interface TodayHeroContainerProps {
  onAddTask?: () => void;
}

export const TodayHeroContainer = ({ onAddTask }: TodayHeroContainerProps) => {
  const today = useTodayData();

  const viewModel: TodayHeroViewModel = {
    percentage: today.focus.percentage,
    total: today.summary.tasks.total,
    remaining: today.summary.tasks.total - today.summary.tasks.completed,
    progressText: today.focus.subtext,
    motivation: today.focus.motivation || null,
    status: today.focus.percentage >= 75 ? "on track" : today.focus.percentage >= 50 ? "behind" : "behind",
    onAddTask,
    isLoading: false,
  };

  return <TodayHeroView model={viewModel} />;
};
