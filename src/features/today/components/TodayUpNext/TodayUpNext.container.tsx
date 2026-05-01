import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { getToday } from "@/shared/lib/date";
import { TodayUpNextView } from "./TodayUpNext.view";
import { useTodayData } from "@/features/today/hooks/useTodayData";
import { useMemo } from "react";

export const TodayUpNextContainer = ({ onLogMeal }: { onLogMeal?: () => void } = {}) => {
  const today = useTodayData();
  const toggleTask = useTasksStore((state) => state.toggleTask);
  const todayDate = getToday();

  // Convert upNext data to UpNextItem format
  const items = useMemo(() => today.upNext.map((item) => {
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
    
    if (item.type === "meal") {
      return {
        id: item.id,
        type: "meal" as const,
        title: item.title,
        time: item.time,
        completed: false,
        onToggle: () => onLogMeal?.()
      };
    }
    
    return {
      id: item.id,
      type: item.type,
      title: item.title,
      time: item.time,
      completed: false
    };
  }), [today.upNext, toggleTask, onLogMeal, todayDate]);

  const viewModel = useMemo(() => ({
    items,
    hasItems: items.length > 0
  }), [items]);

  return <TodayUpNextView model={viewModel} />;
};
