import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { getToday } from "@/shared/lib/date";
import { TodayUpNextView, type TodayUpNextViewModel, type UpNextItem } from "./TodayUpNext.view";
import { useTodayData } from "@/features/today/hooks/useTodayData";

export const TodayUpNextContainer = () => {
  const today = useTodayData();
  const toggleTask = useTasksStore((state) => state.toggleTask);
  const todayDate = getToday();

  // Convert upNext data to UpNextItem format
  const items: UpNextItem[] = today.upNext.map((item) => {
    if (item.type === "task") {
      return {
        id: item.id,
        type: "task" as const,
        title: item.title,
        time: item.time,
        completed: false, // This would need to be determined from actual task data
        onToggle: () => toggleTask(item.id, todayDate)
      };
    }
    
    return {
      id: item.id,
      type: item.type,
      title: item.title,
      time: item.time,
      completed: false
    };
  });

  const viewModel: TodayUpNextViewModel = {
    items,
    hasItems: items.length > 0
  };

  return <TodayUpNextView model={viewModel} />;
};
