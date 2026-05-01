import { describe, expect, it } from "vitest";
import {
  isTaskCompleted,
  isTaskOverdue,
  getTaskCompletionStats,
  getTaskProgress,
  buildTaskSubtitle,
} from "@/features/tasks/domain/taskDomain";
import type { Task } from "@/features/tasks/types/types";

describe("Task Completion Logic", () => {
  const mockTasks: Task[] = [
    {
      id: "1",
      label: "Completed Task",
      date: "2026-04-21",
      completed: true,
    },
    {
      id: "2",
      label: "Incomplete Task",
      date: "2026-04-21",
      completed: false,
    },
    {
      id: "3",
      label: "Future Task",
      date: "2026-04-22",
      completed: false,
    },
    {
      id: "4",
      label: "Past Task",
      date: "2026-04-20",
      completed: false,
    },
    {
      id: "5",
      label: "Multi-completion Task",
      date: "2026-04-21",
      completed: true,
    },
  ];

  describe("isTaskCompleted", () => {
    it("should return true for completed tasks", () => {
      expect(isTaskCompleted(mockTasks[0]!)).toBe(true);
      expect(isTaskCompleted(mockTasks[4]!)).toBe(true);
      expect(isTaskCompleted(mockTasks[4]!)).toBe(true);
    });

    it("should return false for incomplete tasks", () => {
      expect(isTaskCompleted(mockTasks[1]!)).toBe(false);
      expect(isTaskCompleted(mockTasks[2]!)).toBe(false);
    });

    it("should return false for completed tasks", () => {
      expect(isTaskCompleted(mockTasks[0]!)).toBe(false);
      expect(isTaskCompleted(mockTasks[2]!)).toBe(false);
    });

    it("should handle edge cases", () => {
      expect(isTaskCompleted(mockTasks[0]!, "invalid-date")).toBe(false);
      expect(isTaskCompleted(mockTasks[0]!, "")).toBe(false);
    });
  });

  describe("isTaskOverdue", () => {
    it("should return true for overdue tasks", () => {
      expect(isTaskOverdue(mockTasks[3]!)).toBe(true);
    });

    it("should return false for completed tasks", () => {
      expect(isTaskOverdue(mockTasks[0]!, "2026-04-21")).toBe(false);
    });

    it("should return false for future tasks", () => {
      expect(isTaskOverdue(mockTasks[2]!, "2026-04-21")).toBe(false);
    });

    it("should return false for same-day incomplete tasks", () => {
      expect(isTaskOverdue(mockTasks[1]!, "2026-04-21")).toBe(false);
    });

    it("should handle edge cases", () => {
      expect(isTaskOverdue(mockTasks[3]!, "invalid-date")).toBe(false);
      expect(isTaskOverdue(mockTasks[3]!, "")).toBe(false);
    });
  });

  describe("getTaskCompletionStats", () => {
    it("should calculate correct completion stats", () => {
      const stats = getTaskCompletionStats(mockTasks, "2026-04-21");
      
      expect(stats.total).toBe(4); // Tasks for today (excluding future and past)
      expect(stats.completed).toBe(2); // Completed tasks for today
      expect(stats.percentage).toBe(50); // 2/4 * 100
    });

    it("should handle empty task list", () => {
      const stats = getTaskCompletionStats([], "2026-04-21");
      
      expect(stats.total).toBe(0);
      expect(stats.completed).toBe(0);
      expect(stats.percentage).toBe(0);
    });

    it("should handle all completed tasks", () => {
      const allCompletedTasks = mockTasks.map(task => ({
        ...task,
        completed: true,
      }));
      
      const stats = getTaskCompletionStats(allCompletedTasks, "2026-04-21");
      
      expect(stats.total).toBe(5);
      expect(stats.completed).toBe(5);
      expect(stats.percentage).toBe(100);
    });

    it("should handle no completed tasks", () => {
      const noCompletedTasks = mockTasks.map(task => ({
        ...task,
        completed: false,
      }));
      
      const stats = getTaskCompletionStats(noCompletedTasks, "2026-04-21");
      
      expect(stats.total).toBe(4);
      expect(stats.completed).toBe(0);
      expect(stats.percentage).toBe(0);
    });

    it("should handle large task lists efficiently", () => {
      const largeTaskList: Task[] = Array.from({ length: 10000 }, (_, i) => ({
        id: `task-${i}`,
        label: `Task ${i}`,
        date: "2026-04-21",
        completed: i % 2 === 0,
        completedDate: i % 2 === 0 ? "2026-04-21" : undefined,
      }));
      
      const stats = getTaskCompletionStats(largeTaskList, "2026-04-21");
      
      expect(stats.total).toBe(10000);
      expect(stats.completed).toBe(5000);
      expect(stats.percentage).toBe(50);
    });
  });

  describe("getTaskProgress", () => {
    it("should calculate correct progress", () => {
      const progress = getTaskProgress(mockTasks, "2026-04-21");
      
      expect(progress.total).toBe(4);
      expect(progress.completed).toBe(2);
      expect(progress.percentage).toBe(50);
    });

    it("should handle zero division safely", () => {
      const progress = getTaskProgress([], "2026-04-21");
      
      expect(progress.total).toBe(0);
      expect(progress.completed).toBe(0);
      expect(progress.percentage).toBe(0);
    });

    it("should round percentages correctly", () => {
      const tasksWithRounding: Task[] = [
        {
          id: "1",
          label: "Task 1",
          date: "2026-04-21",
          completed: true,
        },
        {
          id: "2",
          label: "Task 2",
          date: "2026-04-21",
          completed: false,
        },
        {
          id: "3",
          label: "Task 3",
          date: "2026-04-21",
          completed: false,
        },
      ];
      
      const progress = getTaskProgress(tasksWithRounding, "2026-04-21");
      expect(progress.percentage).toBe(33); // 1/3 * 100 = 33.33 -> 33
    });
  });

  describe("buildTaskSubtitle", () => {
    it("should build subtitle with time", () => {
      const taskWithTime: Task = {
        id: "1",
        label: "Task with time",
        date: "2026-04-21",
        completed: false,
        time: "09:00",
      };
      
      const subtitle = buildTaskSubtitle(taskWithTime);
      expect(subtitle).toContain("09:00");
    });

    it("should build subtitle without time", () => {
      const taskWithoutTime: Task = {
        id: "1",
        label: "Task without time",
        date: "2026-04-21",
        completed: false,
      };
      
      const subtitle = buildTaskSubtitle(taskWithoutTime);
      expect(subtitle).toBe("");
    });

    it("should handle edge cases", () => {
      const taskWithEmptyTime: Task = {
        id: "1",
        label: "Task with empty time",
        date: "2026-04-21",
        completed: false,
        time: "",
      };
      
      const subtitle = buildTaskSubtitle(taskWithEmptyTime);
      expect(subtitle).toBe("");
    });
  });
});
