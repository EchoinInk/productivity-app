/**
 * Task Service Layer
 * Isolates data operations for future React Query integration.
 * Currently wraps local Zustand store; will be replaced with API calls.
 */

import type { CreateTaskInput, Task } from "../types";

export interface TaskService {
  getTasks(): Promise<Task[]>;
  createTask(input: CreateTaskInput): Promise<Task>;
  updateTask(id: string, updates: Partial<Task>): Promise<Task>;
  deleteTask(id: string): Promise<void>;
}

// Placeholder implementation using local store
// TODO: Replace with React Query + API calls
export const taskService: TaskService = {
  async getTasks() {
    // Simulate API call
    return [];
  },
  async createTask(input: CreateTaskInput) {
    // Simulate API call
    return {} as Task;
  },
  async updateTask(id: string, updates: Partial<Task>) {
    // Simulate API call
    return {} as Task;
  },
  async deleteTask(id: string) {
    // Simulate API call
  },
};