import { useMemo } from "react";

import {
  buildTaskSubtitle,
  getTaskGroups,
  isTaskCompleted,
  selectTasks,
} from "@/features/tasks/api";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";

import { getToday, type DateKey } from "@/shared/lib/date";

export type TaskRowVM = {
  id: string;
  title: string;
  subtitle: string;
  isCompleted: boolean;
  category: string | null;
};

export type TaskGroupVM = {
  title: string;
  tasks: TaskRowVM[];
  total: number;
  completed: number;
  percentage: number;
  emptyMessage: string;
};

export type TasksViewModel = {
  activeDate: DateKey;
  groups: TaskGroupVM[];
};

type GroupKey = "today" | "upcoming" | "yesterday";

const GROUP_TITLES: Record<GroupKey, string> = {
  today: "Today",
  upcoming: "Upcoming",
  yesterday: "Yesterday",
};

const EMPTY_MESSAGES: Record<GroupKey, string> = {
  today: "No tasks for today",
  upcoming: "Nothing coming up",
  yesterday: "No tasks from yesterday",
};

const GROUP_ORDER: GroupKey[] = ["today", "upcoming", "yesterday"];

export const useTasksViewModel = (
  date?: DateKey,
): TasksViewModel => {
  const activeDate = date ?? getToday();
  const tasks = useTasksStore(selectTasks);

  const groups = useMemo<TaskGroupVM[]>(() => {
    const groupedTasks = getTaskGroups(tasks, activeDate);

    return GROUP_ORDER.map((key) => {
      const groupTasks = groupedTasks[key];
      const total = groupTasks.length;
      const completed = groupTasks.filter((task) =>
        isTaskCompleted(task, activeDate),
      ).length;
      const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

      const taskRows: TaskRowVM[] = groupTasks.map((task) => ({
        id: String(task.id),
        title: task.label,
        subtitle: buildTaskSubtitle(task),
        isCompleted: isTaskCompleted(task, activeDate),
        category: task.category ?? null,
      }));

      return {
        title: GROUP_TITLES[key],
        tasks: taskRows,
        total,
        completed,
        percentage,
        emptyMessage: EMPTY_MESSAGES[key],
      };
    });
  }, [tasks, activeDate]);

  return { activeDate, groups };
};
