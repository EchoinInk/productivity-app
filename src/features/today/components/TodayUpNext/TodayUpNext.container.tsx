import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { TodayUpNextView } from "./TodayUpNext.view";
import { useMemo } from "react";
import {
  selectIncompleteTodayTasks,
  selectUpcomingTasks,
} from "@/features/tasks/selectors/taskSelectors";
import { getToday } from "@/shared/lib/date";

export const TodayUpNextContainer = () => {
  const tasks = useTasksStore((s) => s.tasks);
  const toggleTask = useTasksStore((s) => s.toggleTask);

  const today = getToday();

  const incompleteTasks = selectIncompleteTodayTasks(tasks, today);
  const upcomingTasks = selectUpcomingTasks(tasks, today);

 const items = useMemo(() => {
  const sorted = [...incompleteTasks, ...upcomingTasks]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 1);

  if (!sorted.length) return [];

  const next = sorted[0]!; // ✅ SAFE after length check

  return [
    {
      id: next.id,
      type: "task" as const,
      title: next.label,
      time: next.time,
      completed: false,
      onToggle: () => toggleTask(next.id),
    },
  ];
}, [incompleteTasks, upcomingTasks, toggleTask]);

  return (
    <TodayUpNextView
      model={{
        items,
        hasItems: items.length > 0,
      }}
    />
  );
};