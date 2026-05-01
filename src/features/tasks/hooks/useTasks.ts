import { useMemo } from "react";

import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { getToday } from "@/shared/lib/date";

import type {
  CreateTaskInput,
  EntityId,
  Task,
} from "@/features/tasks/types/types";

export interface TaskActions {
  addTask: (input: CreateTaskInput) => void;
  toggleTask: (id: EntityId) => void;
  updateTask: (id: EntityId, updates: Partial<Task>) => void;
  deleteTask: (id: EntityId) => void;
}

export interface TaskSections {
  today: Task[];
  upcoming: Task[];
  completed: Task[];
}

export interface UseTasksResult {
  tasks: Task[];
  sections: TaskSections;
  actions: TaskActions;
}

export const useTasks = (): UseTasksResult => {
  const tasks = useTasksStore((state) => state.tasks);
  const today = getToday();

  const addTask = useTasksStore((state) => state.addTask);
  const toggleTask = useTasksStore((state) => state.toggleTask);
  const updateTask = useTasksStore((state) => state.updateTask);
  const deleteTask = useTasksStore((state) => state.deleteTask);

  const sections = useMemo<TaskSections>(() => {
    const todayDate = today || new Date().toISOString().split("T")[0]!;
    return {
      today: tasks.filter(t => t.date === todayDate && !t.completed),
      upcoming: tasks.filter(t => t.date > todayDate),
      completed: tasks.filter(t => t.completed),
    };
  }, [tasks, today]);

  const actions = useMemo<TaskActions>(
    () => ({ addTask, toggleTask, updateTask, deleteTask }),
    [addTask, toggleTask, updateTask, deleteTask],
  );

  return { tasks, sections, actions };
};


export const useTaskById = (id: string): Task | null => {
  const tasks = useTasksStore((state) => state.tasks);
  return tasks.find((task) => String(task.id) === id) ?? null;
};

