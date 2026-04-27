import { useMemo } from "react";

import {
  getTaskGroups,
  isTaskCompleted,
  selectTasks,
  selectToggleTask,
} from "@/features/tasks/api";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";

import { getToday, type DateKey } from "@/shared/lib/date";
import { getCategoryMetadata } from "@/features/tasks/constants/categories";
import { buildTaskSubtitle } from "@/shared/lib/taskFormat";

import type { Task } from "@/features/tasks/types";

export type TaskRowVM = {
  id: string;
  title: string;
  subtitle: string;
  categoryLabel: string;
  categoryBackgroundColor: string;
  categoryTextColor: string;
  titleClassName: string;
  subtitleClassName: string;
  categoryBadgeClassName: string;
  categoryIndicatorOpacity: number;
  rowOpacity: number;
  rowScale: number;
  onToggleTask: () => void;
  onSelectTask: () => void;
};

type TaskSectionKey = "today" | "upcoming" | "yesterday";

export type TaskSectionViewModel = {
  key: TaskSectionKey;
  title: string;
  taskRows: TaskRowVM[];
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

type UseTasksViewModelOptions = {
  onSelectTask?: (task: Task) => void;
};

const NOOP_SELECT_TASK = (_task: Task): void => {};

export const useTasksViewModel = (
  date?: DateKey,
  options?: UseTasksViewModelOptions,
): TasksViewModel => {
  const activeDate = date ?? getToday();
  const tasks = useTasksStore(selectTasks);
  const toggleTask = useTasksStore(selectToggleTask);
  const onSelectTask = options?.onSelectTask ?? NOOP_SELECT_TASK;

  const sections = useMemo<TaskSectionViewModel[]>(() => {
    const groups = getTaskGroups(tasks, activeDate);

    return SECTION_ORDER.map((key) => {
      const groupTasks = groups[key];
      const total = groupTasks.length;
      const completed = groupTasks.filter((task) =>
        isTaskCompleted(task, activeDate),
      ).length;
      const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
      const taskRows: TaskRowVM[] = groupTasks.map((task) => {
        const categoryStyle = getCategoryMetadata(task.category);
        const subtitle = buildTaskSubtitle(task);
        const taskCompleted = isTaskCompleted(task, activeDate);

        return {
          id: String(task.id),
          title: task.label,
          subtitle,
          categoryLabel: task.category ?? "",
          categoryBackgroundColor: categoryStyle.bg,
          categoryTextColor: categoryStyle.text,
          titleClassName: taskCompleted
            ? "font-medium transition-all opacity-50 line-through"
            : "font-medium transition-all",
          subtitleClassName: subtitle
            ? "text-muted-foreground"
            : "text-muted-foreground hidden",
          categoryBadgeClassName: task.category
            ? "inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium"
            : "inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium hidden",
          categoryIndicatorOpacity: task.category ? 1 : 0,
          rowOpacity: taskCompleted ? 0.6 : 1,
          rowScale: taskCompleted ? 0.98 : 1,
          onToggleTask: () => toggleTask(task.id, activeDate),
          onSelectTask: () => onSelectTask(task),
        };
      });

      return {
        key,
        title: SECTION_TITLES[key],
        taskRows,
        total,
        completed,
        percentage,
        emptyMessage: EMPTY_MESSAGES[key],
        emptyHint: EMPTY_HINTS[key],
      };
    });
  }, [tasks, activeDate, toggleTask, onSelectTask]);

  return { activeDate, sections };
};
