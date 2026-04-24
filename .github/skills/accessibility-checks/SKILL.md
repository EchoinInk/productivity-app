---
name: accessibility-checks
description: 'Provide automated accessibility validation for components and pages using Testing Library role assertions and axe-core. Use for adding role-based tests, axe-core checks, ensuring correct roles and aria attributes in IOS-Life-App.'
argument-hint: 'Component or test file to check...'
user-invocable: true
---

# Accessibility Checks Skill

## Purpose
Provide automated accessibility validation for components and pages using Testing Library role assertions and axe-core. This skill prepares the codebase for CI-level accessibility enforcement.

## Capabilities
- Add or update tests to include role-based queries (getByRole, findByRole).
- Add axe-core checks to existing test files.
- Ensure modals, buttons, tabs, and navigation elements have correct roles, labels, aria-selected, aria-expanded, and keyboard semantics.
- Suggest missing accessibility attributes when tests fail.

## Constraints
- Do not introduce Playwright or end-to-end tests.
- Do not modify CI pipelines directly.
- Keep changes behavior-preserving.
- Follow existing project patterns for test structure.

## Procedure
1. Identify the component or test file to update.
2. Add role-based assertions using Testing Library.
3. Integrate axe-core for automated accessibility checks.
4. Ensure aria attributes and keyboard semantics are present.
5. Run tests to validate and suggest fixes for failures.

## When to Use
- When adding new components or modifying existing ones.
- Preparing for CI accessibility checks.
- Debugging accessibility issues in tests.

## Setup & Patterns

### Axe-Core Setup Pattern
When adding axe-core checks, follow this pattern:
- Import { axe, toHaveNoViolations } from "jest-axe".
- Extend expect with toHaveNoViolations.
- Add an async axe(container) assertion after initial render.

Example:
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend({ toHaveNoViolations });

test("component is accessible", async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

### Role-Based Query Pattern
When adding role assertions, prefer:
- getByRole / findByRole
- name: options for accessible names
- role="dialog", role="button", role="tab", role="tablist", etc.

Example:
expect(screen.getByRole("dialog", { name: /add income/i })).toBeInTheDocument();
expect(screen.getByRole("button", { name: /submit/i })).toBeEnabled();

### Modal Pattern
Ensure BottomSheetDialog-based modals include:
- role="dialog"
- aria-labelledby or aria-label
- focus trap behavior (if applicable)

### TabBar Pattern
Ensure tabs include:
- role="tablist"
- role="tab"
- aria-selected
- keyboard arrow navigation

If jest-axe is not installed, propose adding it to devDependencies and updating the Jest setup file.
