# Shared Form Primitives Pattern

## Overview
Use the shared form primitives (`Field`, `SelectField`, `TextareaField`, `ModalForm`) instead of duplicating input markup. This ensures consistent styling, validation, and accessibility across all forms.

## Before
```jsx
<input 
  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2" 
  type="text"
  placeholder="Enter name"
/>
<label className="text-sm font-medium">Name</label>
```

## After
```jsx
<Field 
  label="Name" 
  value={name} 
  onChange={setName}
  placeholder="Enter name"
/>
```

## Shared Primitives Reference
- **Field**: Basic text input with label support
- **SelectField**: Dropdown select with optional grouping
- **TextareaField**: Multi-line text input
- **ModalForm**: Form wrapper for modals with consistent actions

## Key Points
- Import primitives from `src/components/ui/` or feature-specific components.
- Reduces duplication and improves maintainability.
- Automatically inherits design system styling and tokens.
- Ensures consistent validation and error handling.
- All primitives are fully accessible with proper roles and aria attributes.