# Accessible Tab Pattern

## Overview
Ensure tab elements use semantic HTML roles and aria attributes for keyboard navigation and screen reader support. Tabs must have proper `role="tab"`, `aria-selected`, and `tabIndex` attributes.

## Before
```jsx
<button className={active ? "active" : ""}>
  Meals
</button>
<button className={active ? "active" : ""}>
  Recipes
</button>
```

## After
```jsx
<div role="tablist" aria-label="Meal sections">
  <button
    role="tab"
    aria-selected={active === "meals"}
    tabIndex={active === "meals" ? 0 : -1}
    onClick={() => setActive("meals")}
  >
    Meals
  </button>
  <button
    role="tab"
    aria-selected={active === "recipes"}
    tabIndex={active === "recipes" ? 0 : -1}
    onClick={() => setActive("recipes")}
  >
    Recipes
  </button>
</div>
```

## Key Points
- Parent container must have `role="tablist"`.
- Each tab must have `role="tab"`.
- Use `aria-selected` to indicate active state, not className.
- Set `tabIndex={0}` for active tab, `tabIndex={-1}` for inactive tabs.
- Add `aria-label` to the tablist for screen reader context.
- Support arrow key navigation for keyboard users (optional but recommended).