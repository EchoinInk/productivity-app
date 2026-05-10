# Mobile Redesign Candidates
This file lists every screen or UI surface that requires redesign for React Native.

## HomeScreen

### Keep
- Cross-feature dashboard concept with focus areas
- Quick capture utilities for tasks, meals, expenses
- Insights panel with contextual information
- Personalized greeting based on time of day

### Remove
- Desktop-first fixed width constraints (max-w-[430px])
- Web-specific modal positioning and overlays
- Desktop hover states and transitions
- Multi-modal overlay patterns

### Redesign
- Replace fixed layout with flexible mobile-first container
- Implement bottom sheet modals for task/meal/expense creation
- Add swipe gestures for quick actions
- Optimize touch targets (44px minimum)
- Implement pull-to-refresh for dashboard data
- Add haptic feedback for interactions
- Use native mobile navigation patterns

## TasksPage

### Keep
- Task organization by date and status
- Calendar navigation for task selection
- Task completion toggling
- Floating action button for task creation
- Task categorization and priority display

### Remove
- Horizontal calendar strip with desktop scrolling
- Desktop hover states on task items
- Web-based floating button positioning
- Multi-column layout assumptions

### Redesign
- Replace calendar strip with native date picker or mobile-optimized horizontal scroll
- Implement swipe-to-complete gestures on task items
- Add pull-to-refresh for task lists
- Use native mobile FAB positioning
- Implement mobile-specific task item layouts with larger touch targets
- Add haptic feedback for task completion
- Use native mobile date selection patterns

## BudgetPage

### Keep
- Budget summary with remaining/income display
- Transaction list with amount formatting
- Add expense/income functionality
- Progress bar for budget visualization
- Category-based transaction organization

### Remove
- Desktop card layouts with fixed dimensions
- Web-specific progress bar styling
- Desktop button layouts and spacing
- Multi-column grid layouts for metrics

### Redesign
- Implement mobile-first card layouts with flexible sizing
- Use native mobile progress indicators
- Add swipe gestures for transaction management
- Implement bottom sheet modals for expense/income creation
- Add pull-to-refresh for transaction list
- Use mobile-optimized number inputs with numeric keyboards
- Implement mobile-specific metric displays

## MealPlannerPage

### Keep
- Week-based meal organization
- Add meal functionality with day selection
- Meal display by weekday
- Empty state handling with action prompts

### Remove
- Desktop card layouts for each weekday
- Web-specific button positioning
- Desktop spacing and typography assumptions

### Redesign
- Implement mobile-optimized weekday navigation
- Add swipe gestures for meal management
- Use bottom sheet modals for meal creation
- Implement mobile-specific meal item layouts
- Add pull-to-refresh for meal data
- Use native mobile selection patterns for weekdays

## ShoppingListPage

### Keep
- Category-based shopping organization (Groceries/Household)
- Item completion toggling
- Add item functionality with category selection
- Tab-based category navigation

### Remove
- Desktop tab bar with grid layout
- Web-specific surface styling
- Desktop button positioning and spacing

### Redesign
- Implement mobile-native tab navigation
- Add swipe-to-complete gestures for shopping items
- Use bottom sheet modals for item creation
- Implement mobile-optimized list layouts
- Add pull-to-refresh for shopping lists
- Use native mobile selection patterns for categories

## RecipesPage

### Keep
- Recipe collection display with metadata
- One-click recipe application to meals/tasks/shopping
- Add recipe functionality
- Recipe categorization and ingredient display

### Remove
- Desktop card layouts with fixed dimensions
- Web-specific button interactions and hover states
- Desktop recipe grid layouts

### Redesign
- Implement mobile-optimized recipe cards
- Add swipe gestures for recipe management
- Use bottom sheet modals for recipe creation
- Implement mobile-specific recipe application flows
- Add pull-to-refresh for recipe collection
- Use native mobile selection patterns

## OnboardingScreen

### Keep
- Multi-step onboarding flow
- Focus area and goal selection
- Module preference collection
- Daily rhythm and planning style selection
- Progress tracking and step validation

### Remove
- Desktop step navigation patterns
- Web-specific form layouts
- Desktop button positioning and spacing

### Redesign
- Implement mobile-native step navigation with swipe gestures
- Use mobile-optimized form layouts with larger touch targets
- Add haptic feedback for step completion
- Implement mobile-specific progress indicators
- Use native mobile selection patterns for preferences
- Add gesture-based step progression

## HomeDashboardView

### Keep
- Today focus card with progress display
- Utility row for quick actions
- Insights panel with contextual information
- Cross-feature data aggregation

### Remove
- Desktop card layouts with fixed spacing
- Web-specific typography and styling
- Desktop interaction patterns

### Redesign
- Implement mobile-optimized card layouts with flexible sizing
- Add swipe gestures for quick actions
- Use mobile-specific progress indicators
- Implement pull-to-refresh for dashboard data
- Add haptic feedback for interactions
- Use native mobile typography and spacing

## TaskSections

### Keep
- Task organization by status (Today, Upcoming, Completed)
- Collapsible completed section
- Task filtering and categorization
- Empty state handling

### Remove
- Desktop expand/collapse patterns
- Web-specific hover states and transitions
- Desktop section headers and spacing

### Redesign
- Implement mobile-native expand/collapse with swipe gestures
- Add pull-to-refresh for task sections
- Use mobile-optimized section headers with larger touch targets
- Implement mobile-specific empty states
- Add haptic feedback for section interactions
- Use native mobile list patterns

## CalendarStrip

### Keep
- Date selection functionality
- 14-day date range display
- Today highlighting and selection states
- Horizontal date navigation

### Remove
- Desktop horizontal scrolling patterns
- Web-specific button styling and hover states
- Desktop date formatting and layout

### Redesign
- Implement mobile-native date picker or calendar component
- Add swipe gestures for date navigation
- Use mobile-optimized date display with larger touch targets
- Implement native mobile selection patterns
- Add haptic feedback for date selection
- Use mobile-specific date formatting

## AddTaskModal

### Keep
- Task creation form with name, category, priority
- Date selection and scheduling
- Form validation and error handling
- Modal-based interaction pattern

### Remove
- Desktop modal positioning and styling
- Web-specific form layouts
- Desktop button positioning

### Redesign
- Implement bottom sheet modal for mobile
- Use mobile-optimized form layouts with larger touch targets
- Add native mobile date picker integration
- Implement mobile-specific form validation patterns
- Add haptic feedback for form submission
- Use native mobile keyboard optimization

## AddExpenseModal

### Keep
- Expense creation form with name and amount
- Budget integration and validation
- Modal-based interaction pattern
- Real-time form validation

### Remove
- Desktop modal styling and positioning
- Web-specific number input patterns
- Desktop form layouts

### Redesign
- Implement bottom sheet modal for mobile
- Use mobile-optimized number inputs with numeric keyboards
- Add native mobile currency formatting
- Implement mobile-specific form validation
- Add haptic feedback for form submission
- Use mobile-optimized input layouts

## AddMealModal

### Keep
- Meal creation form with name and day selection
- Weekday selection and validation
- Modal-based interaction pattern
- Form validation and error handling

### Remove
- Desktop modal styling and positioning
- Web-specific dropdown patterns
- Desktop form layouts

### Redesign
- Implement bottom sheet modal for mobile
- Use mobile-native weekday selection
- Add mobile-optimized form layouts
- Implement native mobile selection patterns
- Add haptic feedback for form submission
- Use mobile-specific form validation

## AddRecipeModal

### Keep
- Recipe creation form with name and ingredients
- Category selection and validation
- Ingredient parsing and formatting
- Modal-based interaction pattern

### Remove
- Desktop modal styling and positioning
- Web-specific textarea and input patterns
- Desktop form layouts

### Redesign
- Implement bottom sheet modal for mobile
- Use mobile-optimized text inputs with proper keyboards
- Add mobile-native category selection
- Implement mobile-specific ingredient input patterns
- Add haptic feedback for form submission
- Use mobile-optimized form layouts

## AddShoppingItemModal

### Keep
- Shopping item creation form with name and category
- Category-based organization
- Modal-based interaction pattern
- Form validation and error handling

### Remove
- Desktop modal styling and positioning
- Web-specific selection patterns
- Desktop form layouts

### Redesign
- Implement bottom sheet modal for mobile
- Use mobile-native category selection
- Add mobile-optimized input layouts
- Implement native mobile selection patterns
- Add haptic feedback for form submission
- Use mobile-specific form validation

## TaskRowNew

### Keep
- Task display with title, category, and priority
- Task completion toggle
- Task metadata and status display
- Interactive task management

### Remove
- Desktop hover states and transitions
- Web-specific checkbox patterns
- Desktop touch target sizes

### Redesign
- Implement mobile-optimized task item layouts
- Add swipe-to-complete gestures
- Use mobile-native toggle patterns
- Implement larger touch targets (44px minimum)
- Add haptic feedback for task completion
- Use mobile-specific typography and spacing

## ShoppingRow

### Keep
- Shopping item display with name and category
- Item completion toggle
- Category-based styling
- Interactive item management

### Remove
- Desktop hover states and transitions
- Web-specific checkbox patterns
- Desktop touch target sizes

### Redesign
- Implement mobile-optimized shopping item layouts
- Add swipe-to-complete gestures
- Use mobile-native toggle patterns
- Implement larger touch targets (44px minimum)
- Add haptic feedback for item completion
- Use mobile-specific styling and spacing

## FloatingAddButton

### Keep
- Floating action button for task creation
- Quick access to add functionality
- Visual prominence and accessibility

### Remove
- Desktop positioning and styling
- Web-specific hover states
- Fixed desktop positioning assumptions

### Redesign
- Implement mobile-native FAB positioning
- Add haptic feedback for button press
- Use mobile-specific touch targets
- Implement native mobile button styling
- Add gesture-based interactions
- Use mobile-optimized positioning

## BottomNav

### Keep
- Navigation between main features
- Active state indication
- Thumb-friendly positioning

### Remove
- Desktop hover states
- Web-specific styling transitions
- Fixed desktop layout assumptions

### Redesign
- Implement native mobile tab navigation
- Add haptic feedback for tab switching
- Use mobile-native active state patterns
- Implement gesture-based navigation
- Use native mobile iconography
- Add mobile-specific transitions
