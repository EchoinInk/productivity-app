---
name: design-token-expansion
description: 'Enable safe and scalable growth of design tokens within the codebase. Use for identifying new tokens, enforcing naming conventions, preventing duplication, validating usage, and providing migration paths in IOS-Life-App.'
argument-hint: 'Token category or component to expand tokens for...'
user-invocable: true
---

# Design Token Expansion Skill

## Purpose
Enable safe and scalable growth of design tokens within the codebase. This skill helps expand the token set while maintaining consistency, avoiding token drift, and ensuring backward compatibility.

## Capabilities
- Identify opportunities to add new tokens for colors, typography, spacing, and shadows.
- Enforce token naming conventions and hierarchy.
- Prevent duplication or conflicting tokens.
- Validate token usage across components to avoid drift.
- Provide migration paths for deprecated or replaced tokens.
- Support automated token generation and synchronization with design tools.

## Constraints
- Do not break existing token references.
- Avoid introducing tokens that overlap in purpose or usage.
- Follow existing naming conventions strictly.
- Ensure tokens are documented and discoverable.
- Do not add tokens without clear design approval.

## Procedure
1. Review current token usage and identify gaps (see [Token Audit](./references/token-audit.md)).
2. Propose new tokens aligned with design needs (see [Token Naming Conventions](./references/token-naming-conventions.md)).
3. Add tokens to the central token file (see [Adding New Tokens](./references/adding-new-tokens.md)).
4. Update components to use new tokens where appropriate (see [Token Migration](./references/token-migration.md)).
5. Deprecate old tokens with clear migration notes (see [Token Deprecation](./references/token-deprecation.md)).
6. Validate with visual regression tests and linting.
7. Document new tokens and usage guidelines (see [Token Documentation](./references/token-documentation.md)).

## When to Use
- When expanding the design system to support new UI patterns.
- When standardizing colors, typography, spacing, or shadows across the app.
- When refactoring existing ad hoc styles to use tokens.
- When coordinating with design changes or theme updates.
- When maintaining token consistency across features.

## Reference Patterns
Detailed patterns and implementation examples are available in the references/ folder:

- [Token Audit](./references/token-audit.md) — Analyze current token usage and identify gaps
- [Token Naming Conventions](./references/token-naming-conventions.md) — Establish consistent naming hierarchy
- [Adding New Tokens](./references/adding-new-tokens.md) — Implement new tokens safely
- [Token Migration](./references/token-migration.md) — Update components to use new tokens
- [Token Deprecation](./references/token-deprecation.md) — Retire old tokens with migration guidance
- [Token Documentation](./references/token-documentation.md) — Document tokens and usage

## Example Commands
/design-token-expansion Add new pastel blue gradient tokens for background usage.
/design-token-expansion Deprecate old shadow tokens and migrate components.
/design-token-expansion Validate token usage consistency in the Button component.