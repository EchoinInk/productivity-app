/**
 * Task Service Layer
 *
 * Pure data-access boundary. Currently a typed placeholder; will be
 * swapped for HTTP/edge-function calls without changing consumer code.
 *
 * NOTE: Hook layer (`useTasks`) currently reads from the local Zustand
 * store. When we move to a remote source, mutations should be issued
 * through this service and React Query (or equivalent) should drive
 * the cache.
 */

import type { CreateTaskInput, EntityId, Task } from "../types";

export interface TaskService {
  getTasks(): Promise<Task[]>;
  createTask(input: CreateTaskInput): Promise<Task>;
  updateTask(id: EntityId, updates: Partial<Task>): Promise<Task>;
  deleteTask(id: EntityId): Promise<void>;
}

export const taskService: TaskService = {
  async getTasks(): Promise<Task[]> {
    return [];
  },
  async createTask(_input: CreateTaskInput): Promise<Task> {
    throw new Error("taskService.createTask not implemented");
  },
  async updateTask(_id: EntityId, _updates: Partial<Task>): Promise<Task> {
    throw new Error("taskService.updateTask not implemented");
  },
  async deleteTask(_id: EntityId): Promise<void> {
    return;
  },
};
