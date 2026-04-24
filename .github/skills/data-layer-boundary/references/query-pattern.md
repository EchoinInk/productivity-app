# Query Pattern

## Overview
Encapsulate data fetching logic into custom hooks that abstract away implementation details. Queries represent read-only operations that fetch and cache data.

## Before (Tightly Coupled)
```jsx
function ShoppingList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch('/api/shopping-items');
      const data = await response.json();
      setItems(data);
      setLoading(false);
    }
    fetchItems();
  }, []);

  return loading ? <p>Loading...</p> : <ul>{items.map(item => ...)}</ul>;
}
```

## After (Data Layer Encapsulation)
```typescript
// hooks/useShoppingItems.ts
import { useQuery } from '@tanstack/react-query';

export const useShoppingItems = () => {
  return useQuery({
    queryKey: ['shoppingItems'],
    queryFn: async () => {
      const response = await fetch('/api/shopping-items');
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
  });
};

// components/ShoppingList.tsx
function ShoppingList() {
  const { data: items = [], isLoading } = useShoppingItems();

  return isLoading ? <p>Loading...</p> : <ul>{items.map(item => ...)}</ul>;
}
```

## Key Points
- Abstract fetch logic into custom hooks.
- Use React Query for caching and background updates.
- Return typed data structures.
- Handle errors consistently.
- Support query parameters for filtering/pagination (see [React Query Integration](./react-query-integration.md) for advanced patterns).
- Keep component code focused on rendering, not data management.