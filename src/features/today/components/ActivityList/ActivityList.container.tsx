import { useShoppingStore } from "@/features/shopping/store/useShoppingStore";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { ActivityListView } from "./ActivityList.view";
import { useMemo } from "react";
import { selectCompletedTasks } from "@/features/tasks/selectors/taskSelectors";

export const ActivityListContainer = ({ onAddTask }: { onAddTask?: () => void } = {}) => {
  const completedTasks = useTasksStore((state) => selectCompletedTasks(state.tasks));
  const shoppingItems = useShoppingStore((state) => state.shoppingItems);

  // Show latest 5 completed tasks sorted by ID (as proxy for createdAt)
  const taskActivities = useMemo(() => {
    return completedTasks
      .sort((a, b) => b.id.localeCompare(a.id)) // Sort by ID descending as proxy for creation time
      .slice(0, 5)
      .map((task) => ({
        id: task.id,
        type: "task_completed" as const,
        title: task.label,
        subtitle: task.category || "Task",
        timestamp: "Today",
      }));
  }, [completedTasks]);

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
  const allActivities = useMemo(() => [...taskActivities, ...shoppingActivities]
    .slice(0, 5), [taskActivities, shoppingActivities]);

  const viewModel = useMemo(() => ({
    activities: allActivities,
    hasActivities: allActivities.length > 0,
    onAddTask
  }), [allActivities, onAddTask]);

  return <ActivityListView model={viewModel} />;
};
