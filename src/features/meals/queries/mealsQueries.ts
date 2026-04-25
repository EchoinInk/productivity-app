/**
 * Meals feature query wrappers.
 * 
 * These wrappers will encapsulate React Query hooks for meal planning.
 * As async services are added, replace store subscriptions with
 * corresponding `useQuery` / `useMutation` calls.
 * 
 * Wrapper signatures must match existing service signatures exactly.
 * No behavior changes — only data-fetching layer abstraction.
 */

// Template for future async data fetching:
// export const useMealsQuery = () => {
//   return useQuery({
//     queryKey: ['meals'],
//     queryFn: async () => { /* fetch meals */ },
//   });
// };
//
// export const useAddMealMutation = () => {
//   return useMutation({
//     mutationFn: async (input: CreateMealInput) => { /* add meal */ },
//     onSuccess: (queryClient) => { /* invalidate queries */ },
//   });
// };
