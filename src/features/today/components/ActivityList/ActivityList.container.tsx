import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { useShoppingStore } from "@/features/shopping/store/useShoppingStore";
import { ActivityListView, type ActivityListViewModel, type ActivityItem } from "./ActivityList.view";
import { useTodayData } from "@/features/today/hooks/useTodayData";

export const ActivityListContainer = () => {
  const today = useTodayData();
  const tasks = useTasksStore((state) => state.tasks);
  const shoppingItems = useShoppingStore((state) => state.shoppingItems);

  // Convert activity data to ActivityItem format
  const activities: ActivityItem[] = today.activity.map((item) => {
    // Get additional details for specific activity types
    if (item.type === "task_completed") {
      const task = tasks.find(t => item.id.includes(t.id));
      return {
        id: item.id,
        type: item.type,
        title: item.label,
        subtitle: task?.category || "Task",
        timestamp: "Today",
      };
    }
    
    if (item.type === "meal_logged") {
      return {
        id: item.id,
        type: item.type,
        title: item.label,
        subtitle: "Today",
        timestamp: "Today",
      };
    }
    
    if (item.type === "expense_added") {
      return {
        id: item.id,
        type: item.type,
        title: item.label,
        subtitle: "Expense",
        timestamp: "Today",
      };
    }
    
    return {
      id: item.id,
      type: item.type,
      title: item.label,
      subtitle: "Activity",
      timestamp: "Today",
    };
  });

  // Add completed shopping items
  const completedShopping = shoppingItems.filter((item) => item.done);
  const shoppingActivities: ActivityItem[] = completedShopping.slice(0, 2).map((item) => ({
    id: `shopping-${item.id}`,
    type: "task_completed" as const,
    title: `Purchased: ${item.name}`,
    subtitle: item.category || "Shopping",
    timestamp: "Today",
  }));

  // Combine and limit activities
  const allActivities = [...activities, ...shoppingActivities]
    .sort((a, b) => {
      // For now, all activities are "Today", so we'll keep original order
      return 0;
    })
    .slice(0, 5);

  const viewModel: ActivityListViewModel = {
    activities: allActivities,
    hasActivities: allActivities.length > 0,
  };

  return <ActivityListView model={viewModel} />;
};
