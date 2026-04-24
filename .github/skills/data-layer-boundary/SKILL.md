---
name: data-layer-boundary
description: 'Establish a clear separation between UI components and data fetching logic by defining a data layer boundary. Use for encapsulating queries/mutations, integrating React Query, supporting remote sync, and preparing for scalable data management in IOS-Life-App.'
argument-hint: 'Feature or data requirement to isolate...'
user-invocable: true
---

# Data Layer Boundary Skill

## Purpose
Establish a clear separation between UI components and data fetching logic by defining a data layer boundary. This skill prepares the codebase for integration with React Query and remote data synchronization, ensuring data consistency, caching, and efficient updates.

## Capabilities
- Encapsulate data fetching and mutation logic away from UI components.
- Define role-based query patterns to control data access.
- Integrate with React Query for caching, background updates, and synchronization.
- Support remote sync mechanisms for offline-first or real-time data.
- Provide clear interfaces for UI to interact with data layer.
- Enforce separation of concerns to improve maintainability and testability.

## Constraints
- Do not tightly couple UI components with data fetching details.
- Avoid direct API calls inside UI components.
- Maintain type safety and consistent data shapes.
- Follow existing project conventions for data access and state management.
- Do not introduce new dependencies beyond React Query and existing sync tools.

## Procedure
1. Identify data requirements for UI components.
2. Create data layer modules or hooks encapsulating queries and mutations (see [Query Pattern](./references/query-pattern.md) and [Mutation Pattern](./references/mutation-pattern.md)).
3. Use React Query hooks within data layer (see [React Query Integration](./references/react-query-integration.md)).
4. Implement role-based access control in query definitions (see [Role-Based Access Control](./references/role-based-access-control.md)).
5. Integrate remote sync logic to keep local cache and server data consistent (see [Remote Sync Pattern](./references/remote-sync-pattern.md)).
6. Expose clean, minimal APIs for UI components to consume (see [API Boundary](./references/api-boundary.md)).
7. Validate by ensuring UI components do not perform direct data fetching.
8. Test data layer independently from UI.

## When to Use
- When adding new features with data requirements.
- When refactoring existing UI components that fetch data directly.
- When preparing for offline support or remote synchronization.
- When implementing role-based access control or permission-based queries.
- When integrating with remote APIs or backends.

## Reference Patterns
Detailed patterns and implementation examples are available in the references/ folder:

- [Query Pattern](./references/query-pattern.md) — Encapsulate read operations with hooks
- [Mutation Pattern](./references/mutation-pattern.md) — Encapsulate write operations with hooks
- [React Query Integration](./references/react-query-integration.md) — Use React Query for caching and sync
- [Role-Based Access Control](./references/role-based-access-control.md) — Implement permission-based queries
- [Remote Sync Pattern](./references/remote-sync-pattern.md) — Sync local and server data
- [API Boundary](./references/api-boundary.md) — Define clean data layer interfaces

## Example Commands
/data-layer-boundary Encapsulate ShoppingList data fetching with React Query hooks.
/data-layer-boundary Implement role-based query control for user profile data.
/data-layer-boundary Add remote sync support for offline edits in Tasks feature.