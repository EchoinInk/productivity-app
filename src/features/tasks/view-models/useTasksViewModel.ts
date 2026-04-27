import { useMemo } from "react";

import { getTaskGroups, isTaskCompleted, selectTasks } from "@/features/tasks/api";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";

import { getToday, type DateKey } from "@/shared/lib/date";

import type { EntityId } from "@/features/tasks/types";

type TaskSectionKey = "today" | "upcoming" | "yesterday";

export type TaskSectionViewModel = {
  key: TaskSectionKey;
  title: string;
  taskIds: EntityId[];
  total: number;
  completed: number;
  percentage: number;
  emptyMessage: string;
  emptyHint: string;
};

export type TasksViewModel = {
  activeDate: DateKey;
  sections: TaskSectionViewModel[];
};

const SECTION_TITLES: Record<TaskSectionKey, string> = {
  today: "Today",
  upcoming: "Upcoming",
  yesterday: "Yesterday",
};

const EMPTY_MESSAGES: Record<TaskSectionKey, string> = {
  today: "No tasks for today",
  upcoming: "Nothing coming up",
  yesterday: "No tasks from yesterday",
};

const EMPTY_HINTS: Record<TaskSectionKey, string> = {
  today: "Add a task to get started",
  upcoming: "Nothing scheduled here",
  yesterday: "Nothing scheduled here",
};

const SECTION_ORDER: TaskSectionKey[] = ["today", "upcoming", "yesterday"];

export const useTasksViewModel = (date?: DateKey): TasksViewModel => {
  const activeDate = date ?? getToday();
  const tasks = useTasksStore(selectTasks);

  const sections = useMemo<TaskSectionViewModel[]>(() => {
    const groups = getTaskGroups(tasks, activeDate);

    return SECTION_ORDER.map((key) => {
      const groupTasks = groups[key];
      const total = groupTasks.length;
      const completed = groupTasks.filter((task) =>
        isTaskCompleted(task, activeDate),
      ).length;
      const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

      return {
        key,
        title: SECTION_TITLES[key],
        taskIds: groupTasks.map((task) => task.id),
        total,
        completed,
        percentage,
        emptyMessage: EMPTY_MESSAGES[key],
        emptyHint: EMPTY_HINTS[key],
      };
    });
  }, [tasks, activeDate]);

  return { activeDate, sections };
};
