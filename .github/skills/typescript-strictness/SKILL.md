---
name: typescript-strictness
description: 'Enforce strict TypeScript patterns across the codebase and prevent regressions after strict mode has been enabled. Use for fixing implicit anys, unsafe returns, nullable hazards in IOS-Life-App.'
argument-hint: 'File or component to check...'
user-invocable: true
---

# TypeScript Strictness Skill

## Purpose
Enforce strict TypeScript patterns across the codebase and prevent regressions after strict mode has been enabled.

## Capabilities
- Identify and fix implicit anys, unsafe returns, and nullable hazards.
- Ensure new components and hooks follow strict typing patterns.
- Enforce typed props, typed selectors, and typed service boundaries.
- Suggest improvements when encountering loosely typed code.

## Constraints
- Do not modify tsconfig settings.
- Do not introduce new dependencies.
- Keep changes behavior-preserving.
- Follow existing project conventions for types and domain models.

## Procedure
1. Identify the file or component with typing issues.
2. Analyze for implicit anys, unsafe returns, and nullable hazards.
3. Apply strict typing fixes using existing types and conventions.
4. Ensure props, selectors, and services are fully typed.
5. Validate changes compile without errors.

## When to Use
- When adding new code or modifying existing components.
- Preventing regressions in strict mode.
- Reviewing code for type safety.

## Reference Patterns

### 1. Implicit Any Fix Pattern
When encountering implicit anys, prefer explicit, narrow types.

Before:
function add(a, b) {
  return a + b;
}

After:
function add(a: number, b: number): number {
  return a + b;
}

### 2. Nullable Handling Pattern
When a value may be null or undefined, use safe guards or defaults.

Before:
return user.name.toUpperCase();

After:
return user?.name?.toUpperCase() ?? "";

### 3. Unsafe Return Type Pattern
Ensure functions that may return undefined are typed accordingly.

Before:
function findTask(id: string) {
  return tasks.find(t => t.id === id);
}

After:
function findTask(id: string): Task | undefined {
  return tasks.find(t => t.id === id);
}

### 4. Selector Typing Pattern
Selectors should return typed, memoized values.

Before:
const mealsForDay = meals.filter(m => m.day === day);

After:
export const selectMealsForDay = (state: State, day: Weekday): Meal[] =>
  state.mealsByDay[day] ?? [];

### 5. Service Function Typing Pattern
Service functions must have typed inputs and outputs.

Before:
export async function saveTask(task) {
  return storage.set("task", task);
}

After:
export async function saveTask(task: Task): Promise<void> {
  await storage.set("task", task);
}
