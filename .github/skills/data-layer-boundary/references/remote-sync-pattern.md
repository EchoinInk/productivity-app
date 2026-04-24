# Remote Sync Pattern

## Overview
Synchronize local data with remote servers while supporting offline-first workflows. This pattern enables users to continue working offline, then sync changes when connectivity is restored.

## Offline-First Sync Hook
```typescript
// hooks/useSyncedShoppingItems.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useSyncedShoppingItems = () => {
  const queryClient = useQueryClient();
  const [isSyncing, setIsSyncing] = useState(false);

  // Fetch from local first, subscribe to server updates
  const query = useQuery({
    queryKey: ['shoppingItems'],
    queryFn: async () => {
      // Try to fetch from server
      try {
        const response = await fetch('/api/shopping-items');
        if (!response.ok) throw new Error('Server error');
        const serverData = await response.json();
        
        // Save to local storage for offline access
        localStorage.setItem('shoppingItems', JSON.stringify(serverData));
        return serverData;
      } catch (error) {
        // Fall back to local storage if offline
        const cached = localStorage.getItem('shoppingItems');
        if (cached) return JSON.parse(cached);
        throw error;
      }
    },
    staleTime: 1000 * 60, // 1 minute
  });

  // Mutation with automatic sync
  const addItemMutation = useMutation({
    mutationFn: async (item: ShoppingItem) => {
      // Optimistically add to local
      const currentData = queryClient.getQueryData(['shoppingItems']) || [];
      const newData = [...currentData, item];
      localStorage.setItem('shoppingItems', JSON.stringify(newData));

      // Try to sync with server
      const response = await fetch('/api/shopping-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      
      if (!response.ok) throw new Error('Sync failed');
      return response.json();
    },
    onSuccess: () => {
      // Refetch to ensure server sync
      queryClient.invalidateQueries({ queryKey: ['shoppingItems'] });
    },
    onError: (error) => {
      // Item was added locally but failed to sync
      // Mark it for retry
      console.warn('Sync failed, will retry:', error);
    },
  });

  // Retry failed syncs
  const retrySync = async () => {
    setIsSyncing(true);
    try {
      // Get local changes
      const local = JSON.parse(localStorage.getItem('shoppingItems') || '[]');
      
      // Sync with server
      const response = await fetch('/api/shopping-items/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(local),
      });
      
      if (response.ok) {
        // Refetch to confirm sync
        await queryClient.refetchQueries({ queryKey: ['shoppingItems'] });
      }
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    items: query.data,
    isLoading: query.isLoading,
    error: query.error,
    addItem: addItemMutation.mutate,
    retrySync,
    isSyncing,
  };
};
```

## Real-Time Sync with WebSocket
```typescript
// hooks/useLiveSync.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useLiveSync = (feature: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(`wss://api.example.com/sync/${feature}`);

    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      
      // Update cache with server data
      queryClient.setQueryData(
        [feature],
        (old) => mergeData(old, update)
      );
    };

    ws.onerror = (error) => {
      console.error('Sync error:', error);
      // Fall back to polling
    };

    return () => ws.close();
  }, [feature, queryClient]);
};

function mergeData(local: any, server: any) {
  // Custom merge logic (e.g., last-write-wins, conflict resolution)
  return { ...local, ...server };
}
```

## Conflict Resolution Pattern
```typescript
// services/conflictResolver.ts
export type ConflictResolution = 'client-wins' | 'server-wins' | 'manual';

export function resolveConflict(
  local: ShoppingItem,
  server: ShoppingItem,
  strategy: ConflictResolution = 'server-wins'
): ShoppingItem {
  switch (strategy) {
    case 'client-wins':
      return local;
    case 'server-wins':
      return server;
    case 'manual':
      // Return both for UI to decide
      return {
        ...server,
        _conflict: { local, server },
      };
    default:
      return server;
  }
}
```

## Key Points
- Implement local storage as fallback for offline access.
- Use timestamps to detect conflicts and determine which version is newer.
- Support multiple sync strategies (last-write-wins, client-wins, manual resolution).
- Retry failed syncs automatically when connectivity is restored.
- Use WebSockets or Server-Sent Events for real-time updates.
- Keep local and server data in sync consistently.
- Document your sync strategy and conflict resolution approach.