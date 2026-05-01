import { useShoppingStore } from "@/features/shopping/store/useShoppingStore";
import { ActivityListView } from "./ActivityList.view";
import { useTodayData } from "@/features/today/hooks/useTodayData";
import { useMemo } from "react";

export const ActivityListContainer = ({ onAddTask }: { onAddTask?: () => void } = {}) => {
  const today = useTodayData();
  const shoppingItems = useShoppingStore((state) => state.shoppingItems);

  // Convert activity data to ActivityItem format
  const activities = useMemo(() => today.activity.map((item) => {
    return {
      id: item.id,
      type: item.type,
      title: item.label,
      subtitle: item.type === "task_completed" ? "Task" : 
               item.type === "meal_logged" ? "Meal" : 
               item.type === "expense_added" ? "Expense" : "Activity",
      timestamp: "Today",
    };
  }), [today.activity]);

  // Add completed shopping items
  const shoppingActivities = useMemo(() => {
    const completedShopping = shoppingItems.filter((item) => item.done);
    return completedShopping.slice(0, 2).map((item) => ({
      id: `shopping-${item.id}`,
      type: "task_completed" as const,
      title: `Purchased: ${item.name}`,
      subtitle: item.category || "Shopping",
      timestamp: "Today",
    }));
  }, [shoppingItems]);

  // Combine and limit activities
  const allActivities = useMemo(() => [...activities, ...shoppingActivities]
    .sort(() => {
      // For now, all activities are "Today", so we'll keep original order
      return 0;
    })
    .slice(0, 5), [activities, shoppingActivities]);

  const viewModel = useMemo(() => ({
    activities: allActivities,
    hasActivities: allActivities.length > 0,
    onAddTask
  }), [allActivities, onAddTask]);

  return <ActivityListView model={viewModel} />;
};
