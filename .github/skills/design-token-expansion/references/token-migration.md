# Token Migration

## Overview
Update components to use new tokens in place of ad hoc values. Migrations should be done incrementally to avoid large, error-prone changes.

## Migration Strategy

### Phase 1: Identify Components Using Ad Hoc Values
```bash
# Find components using hardcoded colors
grep -r "bg-\[#\|text-\[#" src/components/ --include="*.tsx"

# Find components using arbitrary spacing
grep -r "p-\[1[0-9]\|m-\[1[0-9]" src/components/ --include="*.tsx"
```

### Phase 2: Plan Migration by Component
Create a migration plan document:
```markdown
# Button Component Migration
- Replace bg-[#0066FF] with bg-primary-base
- Replace text-white with text-white (already using token)
- Replace p-[16px] with p-4
- Replace rounded-[6px] with rounded-md

# Card Component Migration
- Replace bg-[#FFFFFF] with bg-background-elevated
- Replace shadow-lg with shadow-card
- Replace rounded-[12px] with rounded-lg
```

## Migration Patterns

### Pattern 1: Direct Replacement
```jsx
// Before
<button className="bg-[#0066FF] text-white px-4 py-2 rounded-md">
  Click me
</button>

// After
<button className="bg-primary-base text-white px-4 py-2 rounded-md">
  Click me
</button>
```

### Pattern 2: Component Prop Refactor
```jsx
// Before
function Card({ children, className }) {
  return (
    <div className={`bg-white rounded-[12px] shadow-lg ${className}`}>
      {children}
    </div>
  );
}

// After
function Card({ children, className }) {
  return (
    <div className={`bg-background-elevated rounded-lg shadow-card ${className}`}>
      {children}
    </div>
  );
}
```

### Pattern 3: Shared Style Extraction
```jsx
// Before (duplicated in multiple components)
const buttonClass = "px-4 py-2 bg-[#0066FF] text-white rounded-md";

// After (using token-based constants)
const BUTTON_CLASSES = "px-4 py-2 bg-primary-base text-white rounded-md";

function Button({ children }) {
  return <button className={BUTTON_CLASSES}>{children}</button>;
}

function IconButton({ children }) {
  return <button className={`${BUTTON_CLASSES} w-10 h-10`}>{children}</button>;
}
```

### Pattern 4: Styled Component Refactor
```typescript
// Before
const StyledCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  padding: 16px;
`;

// After (using tokens)
const StyledCard = styled.div`
  background-color: var(--color-background-elevated);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-elevation-md);
  padding: var(--space-4);
`;
```

## Migration Checklist

### Before Starting Migration
- [ ] New tokens defined and tested
- [ ] Components identified for migration
- [ ] Migration plan documented
- [ ] Team members notified

### During Migration
- [ ] Change one component at a time
- [ ] Run tests after each migration
- [ ] Verify visual consistency (no layout shifts)
- [ ] Commit changes with clear messages

### After Completing Migration
- [ ] All target components updated
- [ ] Tests pass (unit and visual)
- [ ] Code review completed
- [ ] Old ad hoc values removed or deprecated

## Testing Migration

### Visual Regression Testing
```bash
# Before migration: Capture baseline screenshots
npm run test:visual:baseline

# After migration: Compare with new screenshots
npm run test:visual:check
```

### Manual Verification
1. Render component in different screen sizes
2. Verify colors match design mockups
3. Check responsive behavior
4. Test interactive states (hover, focus, active)

## Key Points
- Migrate one component or feature at a time for easier review
- Always test after migration to catch visual regressions
- Document which tokens replaced which ad hoc values
- Get code review before merging migrations
- Update component documentation with new token usage