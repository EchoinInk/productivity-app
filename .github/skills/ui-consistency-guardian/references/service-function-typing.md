# Service Function Typing Pattern

## Overview
Service functions must have fully typed inputs and outputs. This clarifies the contract between layers and prevents accidental type mismatches.

## Before
```typescript
export async function saveTask(task) {
  return storage.set("task", task);
}
```

## After
```typescript
export async function saveTask(task: Task): Promise<void> {
  await storage.set("task", task);
}
```

## Common Patterns

### Storage Service
```typescript
export async function getTask(id: string): Promise<Task | null> {
  const data = await storage.get(`task:${id}`);
  return data ? parseTask(data) : null;
}

export async function saveTask(task: Task): Promise<void> {
  await storage.set(`task:${task.id}`, JSON.stringify(task));
}

export async function deleteTask(id: string): Promise<void> {
  await storage.remove(`task:${id}`);
}
```

### API Service
```typescript
export async function fetchBudget(budgetId: string): Promise<Budget> {
  const response = await fetch(`/api/budgets/${budgetId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch budget: ${response.statusText}`);
  }
  return response.json() as Promise<Budget>;
}

export async function createBudget(input: CreateBudgetInput): Promise<Budget> {
  const response = await fetch('/api/budgets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) {
    throw new Error(`Failed to create budget`);
  }
  return response.json() as Promise<Budget>;
}
```

## Key Points
- Always type input parameters explicitly.
- Always declare return type (never rely on inference).
- Use `Promise<T>` for async functions.
- Use `Promise<void>` when no meaningful value is returned.
- Document error cases and exceptions.
- Consider whether functions should throw or return error unions.