# Modal Pattern

## Overview
Use the shared `BottomSheetDialog` and `ModalForm` primitives for all modals instead of building ad hoc overlay and form structures. This ensures consistent styling, accessibility, and focus management.

## Before
```jsx
<div className="fixed bottom-0 left-0 right-0 bg-white p-4 rounded-t-lg shadow-2xl">
  <h2 className="text-lg font-bold mb-4">Add Item</h2>
  <form>
    <input className="w-full mb-4" placeholder="Name" />
    <button className="w-full">Save</button>
    <button className="w-full">Cancel</button>
  </form>
</div>
```

## After
```jsx
<BottomSheetDialog title="Add Item" onClose={onClose}>
  <ModalForm onSubmit={handleSubmit}>
    <Field 
      label="Name" 
      value={name} 
      onChange={setName}
    />
    <FormActions>
      <Button onClick={handleSubmit}>Save</Button>
      <Button variant="outline" onClick={onClose}>Cancel</Button>
    </FormActions>
  </ModalForm>
</BottomSheetDialog>
```

## Key Points
- Use `BottomSheetDialog` for modals (handles positioning, focus, backdrop).
- Wrap form content in `ModalForm` for consistent styling and action layout.
- Use `FormActions` for button groups.
- All accessibility (focus trap, escape key, backdrop dismiss) is built-in.
- Prefer `BottomSheetDialog` over custom divs with fixed positioning.
- Ensure title is descriptive for screen readers.