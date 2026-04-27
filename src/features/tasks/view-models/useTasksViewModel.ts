import { useMemo } from "react";

import {
  buildTaskSubtitle,
  filterTodayTasks,
  filterUpcomingTasks,
  filterYesterdayTasks,
  getTaskCompletionStats,
  getTodayDateKey,
  isTaskCompleted,
} from "@/features/tasks/domain/taskDomain";
import { selectTasks } from "@/features/tasks/selectors/taskSelectors";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import type { Task } from "@/features/tasks/types";
import type { TaskDateKey } from "@/features/tasks/domain/taskDomain";

export type TaskRowVM = {
  id: string;
  title: string;
  subtitle: string;
  isCompleted: boolean;
  category: string | null;
};

export type TaskGroupType = "today" | "upcoming" | "yesterday";

export type TaskGroupVM = {
  type: TaskGroupType;
  title: string;
  tasks: TaskRowVM[];
  total: number;
  completed: number;
  percentage: number;
  emptyMessage: string;
  emptyHint: string;
};

export type TasksViewModel = {
  sections: TaskGroupVM[];
};

type GroupConfig = {
  type: TaskGroupType;
  filter: (tasks: Task[], date: TaskDateKey) => Task[];
  title: string;
  emptyMessage: string;
  emptyHint: string;
};

const GROUP_CONFIG: GroupConfig[] = [
  {
    type: "today",
    filter: filterTodayTasks,
    title: "Today",
    emptyMessage: "No tasks for today",
    emptyHint: "Add a task to get started",
  },
  {
    type: "upcoming",
    filter: filterUpcomingTasks,
    title: "Upcoming",
    emptyMessage: "Nothing coming up",
    emptyHint: "Nothing scheduled here",
  },
  {
    type: "yesterday",
    filter: filterYesterdayTasks,
    title: "Yesterday",
    emptyMessage: "No tasks from yesterday",
    emptyHint: "Nothing scheduled here",
  },
];

const mapToTaskRowVM = (task: Task, activeDate: TaskDateKey): TaskRowVM => ({
  id: String(task.id),
  title: task.label,
  subtitle: buildTaskSubtitle(task),
  isCompleted: isTaskCompleted(task, activeDate),
  category: task.category ?? null,
});

export const useTasksViewModel = (
  date?: TaskDateKey,
): TasksViewModel => {
  const activeDate = date ?? getTodayDateKey();
  const tasks = useTasksStore(selectTasks);

  const sections = useMemo<TaskGroupVM[]>(() => {
    return GROUP_CONFIG.map((group) => {
      const groupTasks = group.filter(tasks, activeDate);
      const stats = getTaskCompletionStats(groupTasks, activeDate);
      const taskRows: TaskRowVM[] = groupTasks.map((task: Task) =>
        mapToTaskRowVM(task, activeDate),
      );

      return {
        type: group.type,
        title: group.title,
        tasks: taskRows,
        total: stats.total,
        completed: stats.completed,
        percentage: stats.percentage,
        emptyMessage: group.emptyMessage,
        emptyHint: group.emptyHint,
      };
    });
  }, [tasks, activeDate]);

  return { sections };
};
