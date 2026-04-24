# React Query Integration

## Overview
React Query provides powerful data synchronization with automatic caching, background updates, and state management. This pattern shows how to structure queries for advanced features like pagination, filtering, and polling.

## Basic Setup
```typescript
// queryClient configuration
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10,   // 10 minutes (was cacheTime)
      retry: 1,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}
```

## Query with Filtering and Pagination
```typescript
// hooks/useFilteredTasks.ts
import { useQuery } from '@tanstack/react-query';

interface TasksParams {
  status?: 'active' | 'completed';
  page?: number;
  limit?: number;
}

export const useFilteredTasks = (params: TasksParams) => {
  return useQuery({
    queryKey: ['tasks', params], // Different key for different params
    queryFn: async () => {
      const query = new URLSearchParams();
      if (params.status) query.append('status', params.status);
      if (params.page) query.append('page', params.page.toString());
      if (params.limit) query.append('limit', params.limit.toString());

      const response = await fetch(`/api/tasks?${query}`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      return response.json();
    },
    staleTime: 1000 * 60, // 1 minute
  });
};
```

## Mutation with Optimistic Updates
```typescript
// hooks/useUpdateTask.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: Task) => {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error('Failed to update');
      return response.json();
    },
    onMutate: async (newTask: Task) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData(['tasks']);

      // Optimistically update the cache
      queryClient.setQueryData(['tasks'], (old: Task[]) =>
        old.map(t => t.id === newTask.id ? newTask : t)
      );

      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      // Revert on error
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSuccess: () => {
      // Refetch to ensure sync
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
```

## Polling for Real-Time Updates
```typescript
// hooks/useLiveShoppingList.ts
export const useLiveShoppingList = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['shoppingItems', 'live'],
    queryFn: async () => {
      const response = await fetch('/api/shopping-items');
      return response.json();
    },
    refetchInterval: enabled ? 5000 : false, // Poll every 5s if enabled
  });
};
```

## Key Points
- Configure `staleTime` and `gcTime` appropriately for your use case.
- Use query keys that include all relevant parameters (filters, pagination, etc.).
- Implement optimistic updates for mutations to improve perceived performance.
- Use `onMutate`, `onError`, `onSuccess` callbacks for side effects.
- Support polling for real-time data with `refetchInterval`.
- Keep queries pure and side-effect free.