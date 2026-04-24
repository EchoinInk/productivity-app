# Mutation Pattern

## Overview
Encapsulate data modification logic into custom hooks that handle write operations. Mutations represent operations that create, update, or delete data, and trigger cache invalidation or updates.

## Before (Tightly Coupled)
```jsx
function AddShoppingItem() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAdd = async (itemName) => {
    setLoading(true);
    try {
      const response = await fetch('/api/shopping-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: itemName }),
      });
      const newItem = await response.json();
      // Manual cache invalidation or state update
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return <button onClick={() => handleAdd('Item')}>Add</button>;
}
```

## After (Data Layer Encapsulation)
```typescript
// hooks/useAddShoppingItem.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddShoppingItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemName: string) => {
      const response = await fetch('/api/shopping-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: itemName }),
      });
      if (!response.ok) throw new Error('Failed to add item');
      return response.json();
    },
    onSuccess: () => {
      // Automatically invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['shoppingItems'] });
    },
    onError: (error) => {
      // Centralized error handling
      console.error('Add failed:', error);
    },
  });
};

// components/AddShoppingItem.tsx
function AddShoppingItem() {
  const { mutate: addItem, isPending } = useAddShoppingItem();

  const handleAdd = (itemName: string) => {
    addItem(itemName);
  };

  return <button onClick={() => handleAdd('Item')} disabled={isPending}>
    {isPending ? 'Adding...' : 'Add'}
  </button>;
}
```

## Key Points
- Abstract mutation logic into custom hooks.
- Use React Query's `useMutation` for state management.
- Implement `onSuccess` for cache invalidation or updates.
- Implement `onError` for centralized error handling.
- Return typed data structures.
- Keep component focused on UI, not mutation details.
- Support optimistic updates for better UX (optional but recommended).