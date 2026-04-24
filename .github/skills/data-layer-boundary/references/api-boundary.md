# API Boundary

## Overview
Define a clean, minimal interface between UI components and the data layer. The API boundary ensures that components interact with data through well-defined hooks and services, not raw API calls.

## API Boundary Architecture
```
UI Components
    ↓
Custom Hooks (useQuery, useMutation)
    ↓
Services / API Layer (encapsulation)
    ↓
Remote API / Local Storage
```

## Example: Shopping Feature Boundary

### Data Layer Exports
```typescript
// features/shopping/hooks/index.ts
export { useShoppingItems } from './useShoppingItems';
export { useAddShoppingItem } from './useAddShoppingItem';
export { useDeleteShoppingItem } from './useDeleteShoppingItem';
export { useUpdateShoppingItem } from './useUpdateShoppingItem';
export type { ShoppingItem } from '../types';
```

### Service Layer
```typescript
// features/shopping/services/shoppingService.ts
const API_BASE = '/api/shopping';

export const shoppingService = {
  async getItems(): Promise<ShoppingItem[]> {
    const response = await fetch(`${API_BASE}/items`);
    if (!response.ok) throw new Error('Failed to fetch items');
    return response.json();
  },

  async addItem(item: Omit<ShoppingItem, 'id'>): Promise<ShoppingItem> {
    const response = await fetch(`${API_BASE}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error('Failed to add item');
    return response.json();
  },

  async deleteItem(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/items/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete item');
  },
};
```

### Hook Layer
```typescript
// features/shopping/hooks/useShoppingItems.ts
import { useQuery } from '@tanstack/react-query';
import { shoppingService } from '../services/shoppingService';

export const useShoppingItems = () => {
  return useQuery({
    queryKey: ['shopping', 'items'],
    queryFn: shoppingService.getItems,
    staleTime: 1000 * 60, // 1 minute
  });
};

// features/shopping/hooks/useAddShoppingItem.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { shoppingService } from '../services/shoppingService';

export const useAddShoppingItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: shoppingService.addItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopping', 'items'] });
    },
  });
};
```

### Component Usage
```typescript
// components/ShoppingList.tsx
import { useShoppingItems, useAddShoppingItem } from '../hooks';

function ShoppingList() {
  const { data: items = [], isLoading } = useShoppingItems();
  const { mutate: addItem } = useAddShoppingItem();

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={() => addItem({ name: 'Milk' })}>
        Add Item
      </button>
    </div>
  );
}
```

## API Boundary Rules
- **Components only import from hooks**, never from services or API layer directly.
- **Hooks only import from services**, never make direct fetch calls.
- **Services only know about the remote API**, no React/UI concerns.
- **Each feature exports a single entrypoint** (`features/shopping/hooks/index.ts`).
- **Types are exported alongside hooks** for component type safety.
- **No side effects in components** — data fetching is always in hooks.

## Testing Data Layer in Isolation
```typescript
// features/shopping/services/shoppingService.test.ts
describe('shoppingService', () => {
  beforeEach(() => {
    // Mock fetch
    global.fetch = jest.fn();
  });

  it('should fetch items', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: '1', name: 'Milk' }],
    });

    const items = await shoppingService.getItems();
    expect(items).toEqual([{ id: '1', name: 'Milk' }]);
  });
});
```

## Key Points
- Keep the boundary clean and minimal.
- Export only what components need (hooks and types).
- Hide implementation details (services, API URLs).
- Make the data layer testable and independent of UI.
- Document the public API for each feature.
- Use TypeScript for strong contracts between layers.