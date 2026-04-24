# Implicit Any Fix Pattern

## Overview
Eliminate implicit `any` types by providing explicit type annotations. This improves code clarity, catches bugs early, and aligns with strict mode enforcement.

## Before
```typescript
function add(a, b) {
  return a + b;
}
```

## After
```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

## Common Cases

### Function Parameters
```typescript
// Before
const filter = (items, predicate) => items.filter(predicate);

// After
const filter = <T,>(items: T[], predicate: (item: T) => boolean): T[] => 
  items.filter(predicate);
```

### Object Properties
```typescript
// Before
const user = { name, age };

// After
const user: { name: string; age: number } = { name, age };
```

## Key Points
- Always annotate function parameters and return types.
- Use `unknown` for truly dynamic values, not `any`.
- Leverage type inference where safe (e.g., `const x = 1` infers `number`).
- Check tsconfig for `noImplicitAny` strictness level.