/**
 * Recipes feature query wrappers.
 * 
 * These wrappers will encapsulate React Query hooks for recipes.
 * As async services are added, replace store subscriptions with
 * corresponding `useQuery` / `useMutation` calls.
 * 
 * Wrapper signatures must match existing service signatures exactly.
 * No behavior changes — only data-fetching layer abstraction.
 */

// Template for future async data fetching:
// export const useRecipesQuery = () => {
//   return useQuery({
//     queryKey: ['recipes'],
//     queryFn: async () => { /* fetch recipes */ },
//   });
// };
//
// export const useAddRecipeMutation = () => {
//   return useMutation({
//     mutationFn: async (input: CreateRecipeInput) => { /* add recipe */ },
//     onSuccess: (queryClient) => { /* invalidate queries */ },
//   });
// };
