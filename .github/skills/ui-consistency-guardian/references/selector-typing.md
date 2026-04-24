# Selector Typing Pattern

## Overview
Selectors should return typed, memoized values to prevent unnecessary re-renders and ensure type safety. Use explicit return types and memoization for derived state.

## Before
```typescript
const mealsForDay = meals.filter(m => m.day === day);
```

## After
```typescript
export const selectMealsForDay = (state: State, day: Weekday): Meal[] =>
  state.mealsByDay[day] ?? [];
```

## Common Patterns

### Simple Selector
```typescript
export const selectActiveTasks = (state: State): Task[] =>
  state.tasks.filter(t => !t.completed);
```

### Memoized Selector (with Reselect)
```typescript
import { createSelector } from 'reselect';

const selectTasks = (state: State) => state.tasks;
const selectCompletedFilter = (state: State) => state.filters.completed;

export const selectFilteredTasks = createSelector(
  [selectTasks, selectCompletedFilter],
  (tasks: Task[], showCompleted: boolean): Task[] =>
    showCompleted ? tasks : tasks.filter(t => !t.completed)
);
```

### Grouped Selector
```typescript
export const selectTasksByStatus = (state: State): Map<Status, Task[]> => {
  const grouped = new Map<Status, Task[]>();
  state.tasks.forEach(task => {
    if (!grouped.has(task.status)) {
      grouped.set(task.status, []);
    }
    grouped.get(task.status)!.push(task);
  });
  return grouped;
};
```

## Key Points
- Always provide explicit return type annotations.
- Use `??` for safe defaults when accessing nested state.
- Memoize selectors that perform filtering/grouping to avoid per-render recalculation.
- Keep selectors pure (no side effects).
- Export selectors for use in components.