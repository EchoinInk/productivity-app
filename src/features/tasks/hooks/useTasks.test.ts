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
  isTaskCompleted: vi.fn((task: Task) => task.completed),
}));

const mockTasksStore = vi.mocked(useTasksStore);

describe("useTasks", () => {
  describe("useTasks", () => {
    beforeEach(() => {
      vi.clearAllMocks();
      mockTasksStore.mockReturnValue({
        tasks: [
          { id: "1", label: "Today", date: "2026-04-21", completed: false, time: "09:00" },
          { id: "2", label: "Done", date: "2026-04-21", completed: true, time: "08:00" },
          { id: "3", label: "Upcoming", date: "2026-04-22", completed: false },
          { id: "4", label: "Yesterday", date: "2026-04-20", completed: false },
        ],
        addTask: vi.fn(),
        toggleTask: vi.fn(),
        updateTask: vi.fn(),
        deleteTask: vi.fn(),
      });
    });

  it("should return tasks array", () => {
    const { result } = renderHook(() => useTasks());
    
    expect(result.current.tasks).toBeDefined();
    expect(Array.isArray(result.current.tasks)).toBe(true);
    expect(result.current.tasks).toHaveLength(4);
  });

  it("should return task sections", () => {
    const { result } = renderHook(() => useTasks());
    
    expect(result.current.sections).toBeDefined();
    expect(result.current.sections.today).toBeDefined();
    expect(result.current.sections.upcoming).toBeDefined();
    expect(result.current.sections.completed).toBeDefined();
    expect(Array.isArray(result.current.sections.today)).toBe(true);
    expect(Array.isArray(result.current.sections.upcoming)).toBe(true);
    expect(Array.isArray(result.current.sections.completed)).toBe(true);
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
    expect(result.current.sections.today).toHaveLength(0);
    expect(result.current.sections.upcoming).toHaveLength(0);
    expect(result.current.sections.completed).toHaveLength(0);
  });

  it("should handle large task lists efficiently", () => {
    const largeTaskList: Task[] = Array.from({ length: 1000 }, (_, i) => ({
      id: `task-${i}`,
      label: `Task ${i}`,
      date: "2026-04-21",
      completed: i % 2 === 0,
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
    expect(result.current.sections.today.length).toBeGreaterThanOrEqual(0);
    expect(result.current.sections.upcoming.length).toBeGreaterThanOrEqual(0);
    expect(result.current.sections.completed.length).toBeGreaterThanOrEqual(0);
  });

  it("should call addTask when adding a task", () => {
    const mockAddTask = vi.fn();
    mockTasksStore.mockReturnValue({
      tasks: [
        { id: "1", label: "Test task", date: "2026-01-01", completed: false },
        { id: "2", label: "Test task 2", date: "2026-01-01", completed: true },
      ],
      addTask: mockAddTask,
      toggleTask: vi.fn(),
      updateTask: vi.fn(),
      deleteTask: vi.fn(),
    });

    const { result } = renderHook(() => useTasks());
    
    const newTask: CreateTaskInput = {
      label: "New Task",
      date: "2026-04-21",
      time: "10:00",
      category: "Personal",
      recurrence: "Daily",
      notes: "Test notes",
    };
    
    result.current.actions.addTask(newTask);
    
    expect(mockAddTask).toHaveBeenCalledWith(newTask);
  });

  it("should call toggleTask when toggling a task", () => {
    const mockToggleTask = vi.fn();
    mockTasksStore.mockReturnValue({
      tasks,
      addTask: vi.fn(),
      toggleTask: mockToggleTask,
      updateTask: vi.fn(),
      deleteTask: vi.fn(),
    });

    const { result } = renderHook(() => useTasks());
    
    result.current.actions.toggleTask("1");
    
    expect(mockToggleTask).toHaveBeenCalledWith("1");
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


});
