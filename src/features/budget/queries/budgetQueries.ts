/**
 * Budget feature query wrappers.
 * 
 * These wrappers will encapsulate React Query hooks for budget data.
 * As async services are added, replace store subscriptions with
 * corresponding `useQuery` / `useMutation` calls.
 * 
 * Wrapper signatures must match existing service signatures exactly.
 * No behavior changes — only data-fetching layer abstraction.
 */

// Template for future async data fetching:
// export const useBudgetQuery = () => {
//   return useQuery({
//     queryKey: ['budget'],
//     queryFn: async () => { /* fetch budget data */ },
//   });
// };
//
// export const useAddExpenseMutation = () => {
//   return useMutation({
//     mutationFn: async (input: CreateExpenseInput) => { /* add expense */ },
//     onSuccess: (queryClient) => { /* invalidate queries */ },
//   });
// };
//
// export const useSetIncomeMutation = () => {
//   return useMutation({
//     mutationFn: async (income: number) => { /* set income */ },
//     onSuccess: (queryClient) => { /* invalidate queries */ },
//   });
// };
