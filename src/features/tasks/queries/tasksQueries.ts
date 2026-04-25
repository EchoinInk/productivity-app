/**
 * Tasks feature query wrappers.
 * 
 * These wrappers will encapsulate React Query hooks for tasks.
 * As async services are added, replace `useMemo` / store subscriptions
 * with corresponding `useQuery` / `useMutation` calls.
 * 
 * Wrapper signatures must match existing service signatures exactly.
 * No behavior changes — only data-fetching layer abstraction.
 */

// Template for future async data fetching:
// export const useTasksQuery = () => {
//   return useQuery({
//     queryKey: ['tasks'],
//     queryFn: async () => { /* fetch tasks */ },
//   });
// };
//
// export const useCreateTaskMutation = () => {
//   return useMutation({
//     mutationFn: async (input: CreateTaskInput) => { /* create task */ },
//     onSuccess: (queryClient) => { /* invalidate queries */ },
//   });
// };
//
// export const useUpdateTaskMutation = () => {
//   return useMutation({
//     mutationFn: async (id: EntityId, updates: Partial<Task>) => { /* update */ },
//     onSuccess: (queryClient) => { /* invalidate queries */ },
//   });
// };
//
// export const useDeleteTaskMutation = () => {
//   return useMutation({
//     mutationFn: async (id: EntityId) => { /* delete task */ },
//     onSuccess: (queryClient) => { /* invalidate queries */ },
//   });
// };
