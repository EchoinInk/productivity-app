import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { TodayUpNextView } from "./TodayUpNext.view";
import { useMemo } from "react";
import { selectIncompleteTodayTasks, selectUpcomingTasks } from "@/features/tasks/selectors/taskSelectors";

export const TodayUpNextContainer = () => {
  const incompleteTasks = useTasksStore((state) => selectIncompleteTodayTasks(state.tasks));
  const upcomingTasks = useTasksStore((state) => selectUpcomingTasks(state.tasks));
  const toggleTask = useTasksStore((state) => state.toggleTask);

  // Get next task with priority awareness
  const items = useMemo(() => {
    // Priority 1: High priority incomplete tasks for today
    const highPriorityTasks = incompleteTasks
      .filter(task => task.priority === 'high')
      .sort((a, b) => {
        // First by time, then by date
        if (a.time && b.time) return a.time.localeCompare(b.time);
        if (a.time) return -1;
        if (b.time) return 1;
        return a.date.localeCompare(b.date);
      });

    // Priority 2: Medium priority incomplete tasks for today
    const mediumPriorityTasks = incompleteTasks
      .filter(task => task.priority === 'medium')
      .sort((a, b) => {
        if (a.time && b.time) return a.time.localeCompare(b.time);
        if (a.time) return -1;
        if (b.time) return 1;
        return a.date.localeCompare(b.date);
      });

    // Priority 3: Low priority incomplete tasks for today
    const lowPriorityTasks = incompleteTasks
      .filter(task => !task.priority || task.priority === 'low')
      .sort((a, b) => {
        if (a.time && b.time) return a.time.localeCompare(b.time);
        if (a.time) return -1;
        if (b.time) return 1;
        return a.date.localeCompare(b.date);
      });

    // Priority 4: Upcoming tasks (future dates)
    const upcomingTasksSorted = upcomingTasks
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 3);

    // Combine all tasks by priority
    const allTasksSorted = [
      ...highPriorityTasks,
      ...mediumPriorityTasks,
      ...lowPriorityTasks,
      ...upcomingTasksSorted
    ];

    // Get the most relevant task (first high priority, or first available)
    const nextTask = allTasksSorted[0];

    if (!nextTask) {
      return [];
    }

    return [{
      id: nextTask.id,
      type: "task" as const,
      title: nextTask.label,
      time: nextTask.time,
      completed: false,
      onToggle: () => toggleTask(nextTask.id)
    }];
  }, [incompleteTasks, upcomingTasks, toggleTask]);

  const viewModel = useMemo(() => ({
    items,
    hasItems: items.length > 0
  }), [items]);

  return <TodayUpNextView model={viewModel} />;
};
