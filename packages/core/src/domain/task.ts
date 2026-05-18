/**
 * Task domain type
 * Shared across web and mobile apps
 * Note: Web app has extended Task type with additional fields
 */

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}
