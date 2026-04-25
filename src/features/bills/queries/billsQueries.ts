/**
 * Bills feature query wrappers.
 * 
 * These wrappers will encapsulate React Query hooks for bills.
 * As async services are added, replace store subscriptions with
 * corresponding `useQuery` / `useMutation` calls.
 * 
 * Wrapper signatures must match existing service signatures exactly.
 * No behavior changes — only data-fetching layer abstraction.
 */

// Template for future async data fetching:
// export const useBillsQuery = () => {
//   return useQuery({
//     queryKey: ['bills'],
//     queryFn: async () => { /* fetch bills */ },
//   });
// };
//
// export const useAddBillMutation = () => {
//   return useMutation({
//     mutationFn: async (input: CreateBillInput) => { /* add bill */ },
//     onSuccess: (queryClient) => { /* invalidate queries */ },
//   });
// };
