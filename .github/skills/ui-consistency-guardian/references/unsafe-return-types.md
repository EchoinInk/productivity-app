# Unsafe Return Type Pattern

## Overview
Ensure functions that may return `undefined` are explicitly typed to indicate this. Prevent callers from assuming a non-nullable return.

## Before
```typescript
function findTask(id: string) {
  return tasks.find(t => t.id === id);
}
```

## After
```typescript
function findTask(id: string): Task | undefined {
  return tasks.find(t => t.id === id);
}
```

## Common Cases

### Array Methods
```typescript
// Before
const first = items.find(i => i.active);

// After
const first: Item | undefined = items.find(i => i.active);
```

### Optional Returns
```typescript
// Before
function parseJSON(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

// After
function parseJSON(str: string): unknown | null {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}
```

### Getter Methods
```typescript
// Before
get selectedItem() {
  return this.items[this.selectedIndex];
}

// After
get selectedItem(): Item | undefined {
  return this.items[this.selectedIndex];
}
```

## Key Points
- Always annotate return types for public functions/methods.
- Include `| undefined` or `| null` when applicable.
- Use union types to clarify multiple possible outcomes.
- Document why a return might be undefined.