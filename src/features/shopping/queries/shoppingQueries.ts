/**
 * Shopping feature query wrappers.
 * 
 * These wrappers will encapsulate React Query hooks for shopping lists.
 * As async services are added, replace store subscriptions with
 * corresponding `useQuery` / `useMutation` calls.
 * 
 * Wrapper signatures must match existing service signatures exactly.
 * No behavior changes — only data-fetching layer abstraction.
 */

// Template for future async data fetching:
// export const useShoppingItemsQuery = () => {
//   return useQuery({
//     queryKey: ['shoppingItems'],
//     queryFn: async () => { /* fetch shopping items */ },
//   });
// };
//
// export const useAddShoppingItemMutation = () => {
//   return useMutation({
//     mutationFn: async (input: CreateShoppingItemInput) => { /* add item */ },
//     onSuccess: (queryClient) => { /* invalidate queries */ },
//   });
// };
//
// export const useToggleShoppingItemMutation = () => {
//   return useMutation({
//     mutationFn: async (id: EntityId) => { /* toggle item */ },
//     onSuccess: (queryClient) => { /* invalidate queries */ },
//   });
// };
