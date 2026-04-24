# Nullable Handling Pattern

## Overview
Handle nullable values safely using optional chaining (`?.`) and nullish coalescing (`??`). This prevents runtime errors and clarifies intent.

## Before
```typescript
return user.name.toUpperCase();
```

## After
```typescript
return user?.name?.toUpperCase() ?? "";
```

## Common Cases

### Safe Property Access
```typescript
// Before
const email = user.profile.contact.email;

// After
const email = user?.profile?.contact?.email ?? "N/A";
```

### Safe Method Calls
```typescript
// Before
return items.map(item => item.format());

// After
return items.map(item => item?.format?.());
```

### Default Values
```typescript
// Before
const count = data.count || 0;

// After
const count = data?.count ?? 0;  // Distinguishes null from falsy
```

## Key Points
- Use `?.` for safe property/method access.
- Use `??` for default values (different from `||` for falsy values).
- Prefer explicit `undefined` checks over `if (value)` for clarity.
- Consider where nullable values originate (API responses, user input, etc.).
- Document why a value might be null/undefined.