# Token Deprecation

## Overview
Safely retire old tokens when they're replaced by new ones. Deprecation ensures developers are aware of the change and have a clear migration path without breaking existing code immediately.

## Deprecation Lifecycle

```
1. New token introduced
   ↓
2. Old token marked as @deprecated in comments
   ↓
3. Components migrated to new token
   ↓
4. Linting rule enforces new token usage
   ↓
5. Old token removed in major version
```

## Deprecation Pattern

### Step 1: Mark Token as Deprecated
```typescript
// src/theme/tokens.ts
export const tokens = {
  color: {
    primary: {
      lightVariant: '#E6F2FF',  // @deprecated Use primary.light instead
      light: '#E6F2FF',
      base: '#0066FF',
      dark: '#0052CC',
    },
    // ...
  },
  shadow: {
    boxShadowLight: '0 1px 3px rgba(0,0,0,0.1)',  // @deprecated Use shadow.elevation.sm
    elevation: {
      sm: '0 1px 3px rgba(0,0,0,0.1)',
      md: '0 4px 8px rgba(0,0,0,0.15)',
    },
  },
};
```

### Step 2: Document Deprecation
```typescript
/**
 * @deprecated Use `color.primary.light` instead of `color.primary.lightVariant`
 * 
 * Migration:
 * - Old: `color-primary-light-variant`
 * - New: `color-primary-light`
 * 
 * Timeline: To be removed in v2.0.0
 */
```

### Step 3: Add Migration Guide
```markdown
# Token Deprecation Notice

## Deprecated Tokens

### color.primary.lightVariant
- **Status**: Deprecated as of v1.5.0
- **Replacement**: `color.primary.light`
- **Reason**: Naming inconsistency with naming conventions
- **Migration**: Replace all uses of `primary-light-variant` with `primary-light`
- **Removal Date**: v2.0.0 (estimated 3 months from now)

### shadow.boxShadowLight
- **Status**: Deprecated as of v1.5.0
- **Replacement**: `shadow.elevation.sm`
- **Reason**: Better alignment with semantic naming (elevation levels)
- **Migration**: Replace `shadow-box-light` with `shadow-elevation-sm`
- **Removal Date**: v2.0.0
```

### Step 4: Create Linting Rule (ESLint)
```javascript
// .eslintrc.js or eslint.config.js
export default {
  rules: {
    'no-deprecated-tokens': [
      'warn',
      {
        deprecated: [
          'color-primary-light-variant',
          'shadow-box-light',
          'shadow-box-heavy',
        ],
        replacements: {
          'color-primary-light-variant': 'color-primary-light',
          'shadow-box-light': 'shadow-elevation-sm',
          'shadow-box-heavy': 'shadow-elevation-md',
        },
      },
    ],
  },
};
```

### Step 5: Automate Migration (Optional)
```bash
#!/bin/bash
# scripts/migrate-tokens.sh

# Replace deprecated tokens across codebase
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i \
  's/color-primary-light-variant/color-primary-light/g' \
  's/shadow-box-light/shadow-elevation-sm/g' \
  's/shadow-box-heavy/shadow-elevation-md/g'

echo "Token migration complete"
```

### Step 6: Remove Old Token
```typescript
// src/theme/tokens.ts
export const tokens = {
  color: {
    primary: {
      // lightVariant REMOVED (was deprecated in v1.5.0)
      light: '#E6F2FF',
      base: '#0066FF',
      dark: '#0052CC',
    },
  },
};
```

## Deprecation Communication

### Announcement (in CHANGELOG.md)
```markdown
## [1.5.0] - 2025-01-15

### Deprecated
- `color-primary-light-variant` token - use `color-primary-light` instead (removal in v2.0.0)
- `shadow-box-light` token - use `shadow-elevation-sm` instead (removal in v2.0.0)
- `shadow-box-heavy` token - use `shadow-elevation-md` instead (removal in v2.0.0)

### Migration Guide
See [Token Migration Guide](./docs/token-migration.md) for details.
```

### PR Description Example
```markdown
### Token Deprecation: Shadow Tokens

This PR deprecates `shadow-box-*` tokens in favor of semantic `shadow-elevation-*` tokens.

**Deprecated**: `shadow-box-light`, `shadow-box-heavy`
**Replacement**: `shadow-elevation-sm`, `shadow-elevation-md`

**Migration Timeline**:
- v1.5.0: Deprecated (warning in linter)
- v2.0.0: Removed

**Components Updated**: None in this PR (deprecation only)
```

## Deprecation Timeline Template

```markdown
# Token Deprecation: XYZ

| Phase | Version | Date | Status |
|-------|---------|------|--------|
| Introduce new token | v1.4.0 | Jan 2025 | ✅ Done |
| Mark as deprecated | v1.5.0 | Feb 2025 | ⏳ In Progress |
| Linting enforcement | v1.5.0 | Feb 2025 | ⏳ In Progress |
| Migrate components | v1.6.0 | Mar 2025 | ⏹ Planned |
| Remove old token | v2.0.0 | Apr 2025 | ⏹ Planned |
```

## Key Points
- Always introduce the new token before deprecating the old one
- Give at least 1-2 major versions before removal (e.g., deprecate in v1.5, remove in v2.0)
- Update linting rules to warn about deprecated tokens
- Document migration paths clearly for developers
- Announce deprecations in changelog and migration guides
- Automate migration where possible to reduce manual work