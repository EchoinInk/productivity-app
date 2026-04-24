---
name: ui-consistency-guardian
description: 'Ensure all UI components in the IOS-Life-App codebase follow the unified design system. Use for enforcing token usage, consistent radii, shared form primitives, accessible patterns, and eliminating ad hoc styling.'
argument-hint: 'Component or file to check...'
user-invocable: true
---

# UI Consistency Guardian Skill

## Purpose
Ensure all UI components in the IOS-Life-App codebase follow the unified design system. 
This includes enforcing token usage, consistent radii, shared form primitives, accessible patterns, 
and eliminating ad hoc styling. The goal is to maintain visual and structural consistency across 
new and modified UI code.

## Capabilities
- Replace ad hoc colors, gradients, shadows, and radii with tokens from src/theme/tokens.ts.
- Ensure new components use shared primitives:
  - Field, SelectField, TextareaField, ModalForm
  - Button, Card, BottomSheetDialog
- Normalize border radii to the project standard:
  - rounded-md for controls
  - rounded-lg for cards/panels
- Enforce consistent spacing, typography, and layout using existing utility classes and tokens.
- Ensure accessible UI patterns:
  - role="dialog", role="tablist", role="tab"
  - aria-selected, aria-expanded, aria-label
  - keyboard navigation for tablists and interactive elements
- Identify and remove duplicated UI patterns or inline styling.
- Suggest refactors when components drift from the design system.

## Constraints
- Do not introduce new design tokens.
- Do not create new primitives unless absolutely necessary.
- Keep changes behavior-preserving.
- Follow existing project conventions for component structure and styling.
- Do not modify CI pipelines or introduce new dependencies.

## Procedure
1. Identify UI inconsistencies in the modified or targeted files.
2. Compare against the design system tokens and shared primitives.
3. Apply safe, incremental refactors:
   - Replace inline styles with tokens (see [Token Replacement](./references/token-replacement.md)).
   - Replace duplicated form markup with shared primitives (see [Shared Form Primitives](./references/shared-form-primitives.md)).
   - Normalize radii, spacing, and typography (see [Radii Normalization](./references/radii-normalization.md)).
   - Add missing accessibility attributes (see [Accessible Tab Pattern](./references/accessible-tab-pattern.md)).
4. Validate changes by ensuring:
   - TypeScript passes
   - Lint passes
   - Tests pass
5. Provide a summary of what was updated and why.

## When to Use
- When adding or modifying UI components.
- When refactoring modals, forms, cards, or navigation.
- When enforcing design system consistency across features.
- When preparing UI for accessibility checks or visual QA.

## Reference Patterns
Detailed before-and-after examples and explanations are available in the references/ folder:

- [Token Replacement](./references/token-replacement.md) — Replace hardcoded colors and styles with design tokens
- [Shared Form Primitives](./references/shared-form-primitives.md) — Use Field, SelectField, TextareaField, ModalForm
- [Radii Normalization](./references/radii-normalization.md) — Standardize border radii across components
- [Accessible Tab Pattern](./references/accessible-tab-pattern.md) — Implement semantic tabs with proper roles and attributes
- [Modal Pattern](./references/modal-pattern.md) — Use BottomSheetDialog and ModalForm primitives
- [Implicit Any Fix](./references/implicit-any-fix.md) — Eliminate implicit `any` types
- [Nullable Handling](./references/nullable-handling.md) — Safe optional chaining and nullish coalescing
- [Unsafe Return Types](./references/unsafe-return-types.md) — Proper return type annotations
- [Selector Typing](./references/selector-typing.md) — Typed, memoized selectors
- [Service Function Typing](./references/service-function-typing.md) — Fully typed service functions

## Example Commands
/ui-consistency-guardian Normalize radii and token usage in the new ShoppingList components.
/ui-consistency-guardian Replace inline form markup with shared Field and ModalForm primitives.
/ui-consistency-guardian Ensure the updated TabBar uses correct roles, aria attributes, and tokenized states.
