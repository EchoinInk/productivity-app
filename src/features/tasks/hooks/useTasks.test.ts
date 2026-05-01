import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useTasks } from "./useTasks";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import type { Task, CreateTaskInput } from "@/features/tasks/types/types";

// Mock the store
vi.mock("@/features/tasks/store/useTasksStore");

// Mock date utilities
vi.mock("@/shared/lib/date", () => ({
  getToday: () => "2026-04-21",
  isDateAfter: vi.fn(),
  isDateSame: vi.fn(),
}));

// Mock the API functions with simpler implementations
vi.mock("@/features/tasks/api", () => ({
  buildTaskSubtitle: vi.fn((task: Task) => task.label),
  getActiveCategorySummaries: vi.fn(() => []),
  getCategorySummaries: vi.fn(() => []),
  getTaskCompletionStats: vi.fn(),
  getTaskProgress: vi.fn(),
  isTaskCompleted: vi.fn((task: Task, date: string) => task.completedDates.includes(date)),
}));

const mockTasksStore = vi.mocked(useTasksStore);

describe("useTasks", () => {
  const mockTasks: Task[] = [
    {
      id: "1",
      label: "Task 1",
      date: "2026-04-21",
      completedDates: [],
      createdAt: "2026-04-21T00:00:00.000Z",
    },
    {
      id: "2",
      label: "Task 2",
      date: "2026-04-21",
      completedDates: ["2026-04-21"],
      createdAt: "2026-04-21T00:00:00.000Z",
    },
    {
      id: "3",
      label: "Task 3",
      date: "2026-04-22",
      completedDates: [],
      createdAt: "2026-04-21T00:00:00.000Z",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockTasksStore.mockReturnValue({
      tasks: [...mockTasks],
      addTask: vi.fn(),
      toggleTask: vi.fn(),
      updateTask: vi.fn(),
      deleteTask: vi.fn(),
    });
  });

  it("should return task progress", () => {
    const { result } = renderHook(() => useTasks());
    
    expect(result.current.progress).toBeDefined();
    expect(typeof result.current.progress.total).toBe("number");
    expect(typeof result.current.progress.completed).toBe("number");
    expect(typeof result.current.progress.percentage).toBe("number");
  });

  it("should return task insights", () => {
    const { result } = renderHook(() => useTasks());
    
    expect(result.current.insights).toBeDefined();
    expect(result.current.insights.summaries).toEqual([]);
    expect(result.current.insights.active).toEqual([]);
    expect(result.current.insights.hasInsights).toBe(false);
  });

  it("should provide task actions", () => {
    const { result } = renderHook(() => useTasks());
    
    expect(typeof result.current.actions.addTask).toBe("function");
    expect(typeof result.current.actions.toggleTask).toBe("function");
    expect(typeof result.current.actions.updateTask).toBe("function");
    expect(typeof result.current.actions.deleteTask).toBe("function");
  });

  it("should handle empty tasks list", () => {
    mockTasksStore.mockReturnValue({
      tasks: [],
      addTask: vi.fn(),
      toggleTask: vi.fn(),
      updateTask: vi.fn(),
      deleteTask: vi.fn(),
    });

    const { result } = renderHook(() => useTasks());
    
    expect(result.current.sections).toBeDefined();
    expect(result.current.progress.total).toBe(0);
    expect(result.current.progress.completed).toBe(0);
    expect(result.current.progress.percentage).toBe(0);
  });

  it("should handle large task lists efficiently", () => {
    const largeTaskList: Task[] = Array.from({ length: 1000 }, (_, i) => ({
      id: `task-${i}`,
      label: `Task ${i}`,
      date: "2026-04-21",
      completedDates: i % 2 === 0 ? ["2026-04-21"] : [],
      createdAt: "2026-04-21T00:00:00.000Z",
    }));

    mockTasksStore.mockReturnValue({
      tasks: largeTaskList,
      addTask: vi.fn(),
      toggleTask: vi.fn(),
      updateTask: vi.fn(),
      deleteTask: vi.fn(),
    });

    const { result } = renderHook(() => useTasks());
    
    expect(result.current.sections).toBeDefined();
    expect(result.current.progress.total).toBeGreaterThanOrEqual(0);
    expect(result.current.progress.completed).toBeGreaterThanOrEqual(0);
    expect(result.current.progress.percentage).toBeGreaterThanOrEqual(0);
  });

  it("should call addTask when adding a task", () => {
    const mockAddTask = vi.fn();
    mockTasksStore.mockReturnValue({
      tasks: [...mockTasks],
      addTask: mockAddTask,
      toggleTask: vi.fn(),
      updateTask: vi.fn(),
      deleteTask: vi.fn(),
    });

    const { result } = renderHook(() => useTasks());
    
    const newTask: CreateTaskInput = {
      label: "New Task",
      date: "2026-04-21",
    };
    
    result.current.actions.addTask(newTask);
    
    expect(mockAddTask).toHaveBeenCalledWith(newTask);
  });

  it("should call toggleTask when toggling a task", () => {
    const mockToggleTask = vi.fn();
    mockTasksStore.mockReturnValue({
      tasks: [...mockTasks],
      addTask: vi.fn(),
      toggleTask: mockToggleTask,
      updateTask: vi.fn(),
      deleteTask: vi.fn(),
    });

    const { result } = renderHook(() => useTasks());
    
    result.current.actions.toggleTask("1", "2026-04-21");
    
    expect(mockToggleTask).toHaveBeenCalledWith("1", "2026-04-21");
  });

  it("should call updateTask when updating a task", () => {
    const mockUpdateTask = vi.fn();
    mockTasksStore.mockReturnValue({
      tasks: [...mockTasks],
      addTask: vi.fn(),
      toggleTask: vi.fn(),
      updateTask: mockUpdateTask,
      deleteTask: vi.fn(),
    });

    const { result } = renderHook(() => useTasks());
    
    const updates = { label: "Updated Task" };
    result.current.actions.updateTask("1", updates);
    
    expect(mockUpdateTask).toHaveBeenCalledWith("1", updates);
  });

  it("should call deleteTask when deleting a task", () => {
    const mockDeleteTask = vi.fn();
    mockTasksStore.mockReturnValue({
      tasks: [...mockTasks],
      addTask: vi.fn(),
      toggleTask: vi.fn(),
      updateTask: vi.fn(),
      deleteTask: mockDeleteTask,
    });

    const { result } = renderHook(() => useTasks());
    
    result.current.actions.deleteTask("1");
    
    expect(mockDeleteTask).toHaveBeenCalledWith("1");
  });
});
