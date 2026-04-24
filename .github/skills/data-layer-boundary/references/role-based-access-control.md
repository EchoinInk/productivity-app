# Role-Based Access Control

## Overview
Implement permission-based queries and mutations that respect user roles and restrict data access. This ensures that UI components only fetch and modify data they have permission to access.

## Query with Role-Based Access
```typescript
// hooks/useUserProfile.ts
import { useQuery } from '@tanstack/react-query';
import { useUser } from './useUser'; // Assumes user context/hook

export const useUserProfile = (userId: string) => {
  const { user: currentUser } = useUser();

  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      // Check permission before fetching
      if (!canAccessUser(currentUser, userId)) {
        throw new Error('Forbidden: You do not have access to this user');
      }

      const response = await fetch(`/api/users/${userId}`);
      if (response.status === 403) {
        throw new Error('Forbidden');
      }
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json();
    },
    enabled: !!currentUser && canAccessUser(currentUser, userId),
  });
};

// Permission helper
function canAccessUser(currentUser: User, targetUserId: string): boolean {
  return currentUser.id === targetUserId || currentUser.role === 'admin';
}
```

## Mutation with Permission Checks
```typescript
// hooks/useUpdateUserProfile.ts
import { useMutation } from '@tanstack/react-query';
import { useUser } from './useUser';

export const useUpdateUserProfile = (userId: string) => {
  const { user: currentUser } = useUser();

  return useMutation({
    mutationFn: async (updates: Partial<User>) => {
      // Check permission before mutating
      if (!canUpdateUser(currentUser, userId)) {
        throw new Error('Forbidden: You cannot update this user');
      }

      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (response.status === 403) {
        throw new Error('Forbidden');
      }
      if (!response.ok) throw new Error('Failed to update user');
      return response.json();
    },
    onError: (error) => {
      // Handle permission errors gracefully
      if (error.message.includes('Forbidden')) {
        // Show permission denied UI
        console.error('You do not have permission to perform this action');
      }
    },
  });
};

function canUpdateUser(currentUser: User, targetUserId: string): boolean {
  return currentUser.id === targetUserId || currentUser.role === 'admin';
}
```

## Query Scoping by Role
```typescript
// hooks/useTeamTasks.ts
// Only fetch tasks for teams the user has access to

export const useTeamTasks = (teamId: string) => {
  const { user } = useUser();

  return useQuery({
    queryKey: ['teams', teamId, 'tasks'],
    queryFn: async () => {
      const response = await fetch(`/api/teams/${teamId}/tasks`);
      if (response.status === 403) {
        throw new Error('Forbidden: You do not have access to this team');
      }
      if (!response.ok) throw new Error('Failed to fetch tasks');
      return response.json();
    },
    // Disable query if user doesn't have access
    enabled: user?.teamIds?.includes(teamId) ?? false,
  });
};
```

## Key Points
- Check permissions at the data layer, not just the UI layer.
- Use `enabled` in queries to prevent unnecessary API calls for unauthorized users.
- Throw meaningful error messages for permission violations.
- Implement consistent permission logic across all queries and mutations.
- Consider caching permission checks to avoid redundant validation.
- Document which roles can access which queries/mutations.