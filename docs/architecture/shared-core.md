# Architecture Migration Audit: Mobile Transition Boundaries

This document identifies architectural boundaries for React Native/mobile transition using a 4-category classification system:

1. **Shared Core (KEEP / SHARED)**: Platform-agnostic behavioral systems and logic
2. **Shared UI Contracts**: Cross-platform UX patterns and interaction conventions  
3. **Web-Specific (REBUILD)**: Desktop-only UI that must be completely rebuilt
4. **Needs Mobile Redesign**: Concept survives, but interaction model must adapt for mobile

The true reusable value is in behavioral systems (momentum, intelligence, routines, orchestration), not UI components.

---

# Tasks

## Shared Core Candidates (KEEP / SHARED)

### Domain & Business Logic
- `/src/features/tasks/domain/taskDomain.ts`
  - **Why portable**: Pure business logic with no UI dependencies
  - **Contains**: `isTaskCompleted()`, `getCategoryMetadata()`, `formatTaskDisplayDate()`, `formatTaskDateTime()`
  - **Examples**: Task status calculations, date formatting utilities, category metadata mapping

### Types & Interfaces
- `/src/features/tasks/types/types.ts`
  - **Why portable**: Pure TypeScript definitions, platform-agnostic
  - **Contains**: `Task`, `CreateTaskInput`, `EntityId`, `TaskCategory`, `TaskRecurrence`, `TaskPriority`, `TasksState`
  - **Examples**: Core domain entities, input validation types, store state contracts

### Utilities
- `/src/features/tasks/utils/taskUtils.ts`
  - **Why portable**: Pure utility functions, no web dependencies
  - **Contains**: `getTaskPriorityColor()`, `formatTaskTime()`, `getTaskCompletionText()`, `isTaskOverdue()`
  - **Examples**: Priority calculations, time formatting, completion status logic

### Data Access Layer
- `/src/features/tasks/api.ts`
  - **Why portable**: Clean API surface, exports domain logic and types
  - **Contains**: Public interface exports, domain re-exports
  - **Examples**: Stable public API for cross-platform consumption

### Selectors
- `/src/features/tasks/selectors/taskSelectors.ts`
  - **Why portable**: Pure data transformation functions
  - **Contains**: `selectTasksByDate()`, `selectCompletedTasks()`, `selectTodayTasks()`, etc.
  - **Examples**: Data filtering, sorting, and derived state calculations

### Store & Actions (Abstracted)
- `/src/features/tasks/store/useTasksStore.ts`
- `/src/features/tasks/hooks/useTaskActions.ts`
- `/src/features/tasks/hooks/useTaskData.ts`
  - **Why portable**: Zustand store with abstraction hooks, no UI coupling
  - **Contains**: State management, action dispatchers, data selectors
  - **Examples**: `addTask()`, `toggleTask()`, `updateTask()`, `deleteTask()`

## Shared UI Contracts

### Task Interaction Patterns
- **Task Completion Contract**: Checkbox/toggle interaction with immediate visual feedback
- **Task Priority States**: Visual hierarchy (high/medium/low) with consistent color coding
- **Task Category System**: Consistent categorization and metadata display
- **Form Validation Rules**: Real-time validation with consistent error messaging
- **Loading States**: Consistent loading indicators for async operations
- **Empty States**: Consistent empty state messaging and action prompts

### State Conventions
- **Task State Model**: `{ completed: boolean, priority: string, category: string }`
- **Form State Pattern**: `{ value: string, error: string | null, touched: boolean }`
- **Selection State**: Single/multi-select with consistent visual feedback
- **Modal State**: Consistent open/close/submit/cancel flow

## Web-Specific (REBUILD)

### Desktop Layout Components
- `/src/features/tasks/components/CalendarStrip.tsx`
  - **Why web-only**: Desktop calendar interactions, hover states, complex grid layout
  - **Contains**: Web calendar widget, date navigation, hover interactions

- `/src/features/tasks/components/CategoryList.tsx`
  - **Why web-only**: Desktop sidebar layout, category filtering with hover states
  - **Contains**: Sidebar navigation, desktop filtering patterns

- `/src/features/tasks/components/FloatingAddButton.tsx`
  - **Why web-only**: Desktop floating action button with hover effects
  - **Contains**: Fixed positioning, web hover states, desktop FAB pattern

### Page Layouts
- `/src/features/tasks/pages/TasksPage.tsx`
  - **Why web-only**: Desktop page composition, routing integration, web layout
  - **Contains**: Page structure, desktop layout patterns, web routing

## Needs Mobile Redesign

### Task Display Components
- `/src/features/tasks/components/TaskRow.tsx`
  - **Concept survives**: Task item with checkbox, title, metadata display
  - **Mobile redesign needed**: 
    - Larger touch targets (44px minimum)
    - Swipe gestures for completion
    - Thumb-friendly interaction areas
    - Mobile-optimized spacing and typography

- `/src/features/tasks/components/TaskRowNew.tsx`
  - **Concept survives**: Enhanced task item with richer interactions
  - **Mobile redesign needed**:
    - Swipe-to-complete functionality
    - Pull-to-refresh gestures
    - Mobile-optimized action buttons
    - Adaptive layout for different screen sizes

### Task Organization
- `/src/features/tasks/components/TaskSections.tsx`
  - **Concept survives**: Organized task sections (Today, Upcoming, Completed)
  - **Mobile redesign needed**:
    - Collapsible sections with swipe gestures
    - Mobile-optimized expand/collapse animations
    - Touch-friendly section headers
    - Mobile pagination for large lists

- `/src/features/tasks/components/TaskSection.tsx`
  - **Concept survives**: Individual task section with header and items
  - **Mobile redesign needed**:
    - Mobile-optimized section headers
    - Touch-friendly item spacing
    - Mobile-specific loading states

### Modal Interactions
- `/src/features/tasks/components/AddTaskModal/` (entire directory)
- `/src/features/tasks/components/EditTaskModal/` (entire directory)
  - **Concept survives**: Task creation and editing forms
  - **Mobile redesign needed**:
    - Bottom sheet modals instead of centered dialogs
    - Mobile-optimized form layouts
    - Touch-friendly input components
    - Mobile keyboard optimization
    - Gesture-based dismissal

### Dashboard Components
- `/src/features/tasks/components/TaskInsights.tsx`
- `/src/features/tasks/components/TaskProgress.tsx`
- `/src/features/tasks/components/TasksHeroCard.tsx`
  - **Concept survives**: Task metrics, progress tracking, summary cards
  - **Mobile redesign needed**:
    - Mobile-optimized card layouts
    - Touch-friendly progress indicators
    - Mobile-specific chart interactions
    - Adaptive information density

## Refactor Candidates (MIXED)

### TaskSections.tsx (HIGH PRIORITY)
- **What's mixed**: Data filtering logic + UI rendering + state management
- **Extract to**: `/src/features/tasks/services/taskOrganizationService.ts`
- **Suggested extraction**: 
  - Move `selectIncompleteTasks()`, `selectCompletedTasks()` calls to service layer
  - Create `organizeTasksBySections()` function
  - Keep only rendering logic in component
- **Problem**: 132 lines mixing business logic with presentation

### Form Hooks (MEDIUM PRIORITY)
- `/src/features/tasks/hooks/useAddTaskForm.ts`
- `/src/features/tasks/hooks/useEditTaskForm.ts`
  - **What's mixed**: Form validation + state management + potential UI logic
- **Extract to**: `/src/features/tasks/services/taskFormService.ts`
- **Suggested extraction**: 
    - Move validation logic to service
    - Create `validateTaskInput()`, `prepareTaskForSubmission()`
    - Keep only React state in hooks



# Dashboard (Home)

## Shared Core Candidates (KEEP / SHARED)

### Orchestration Logic
- `/src/features/home/hooks/useHomeDashboard.ts`
  - **Why portable**: Pure orchestration, no UI dependencies
  - **Contains**: Cross-feature data coordination, action preparation
  - **Examples**: Task/budget/meal action coordination, derived state calculation

### Personalization Engine
- `/src/features/home/hooks/usePersonalizedHome.ts`
  - **Why portable**: Business logic for personalization, no UI coupling
  - **Contains**: User preference processing, layout calculation, messaging logic
  - **Examples**: `generatePersonalizedDefaults()`, `getPersonalizedDashboardLayout()`, routine integration

## Shared UI Contracts

### Dashboard Interaction Patterns
- **Focus Area Contract**: Dynamic focus calculation based on user priorities
- **Quick Actions Contract**: Consistent action buttons with immediate feedback
- **Personalization Rules**: User preference-driven content adaptation
- **Cross-Feature Integration**: Consistent data aggregation and display patterns

### State Conventions
- **Dashboard State Model**: `{ focus: { percentage, label, subtext }, summary: { tasks, meals, budget, shopping } }`
- **Personalization State**: `{ focusAreas, preferredModules, dailyCadence, planningStyle }`
- **Quick Action State**: Consistent action dispatching with loading states

## Web-Specific (REBUILD)

**CRITICAL FINDING**: No UI components in home feature
- The home feature contains only orchestration hooks
- All UI components live in `/src/components/` or specific feature pages
- **Migration impact**: Home UI components need to be identified in shared component directories

## Needs Mobile Redesign

**CRITICAL FINDING**: Dashboard concept survives but needs complete mobile redesign
- **Concept survives**: Personalized dashboard with focus areas, quick actions, cross-feature summary
- **Mobile redesign needed**:
  - Mobile-first dashboard layout
  - Touch-optimized quick actions
  - Mobile-specific focus indicators
  - Adaptive content density
  - Mobile gesture support (swipe, pull-to-refresh)

## Refactor Candidates (MIXED)

### useHomeDashboard.ts (LOW PRIORITY)
- **What's mixed**: Cross-feature orchestration + action preparation
- **Current state**: Well-abstracted, minimal mixing
- **Suggestion**: Keep as-is - good separation of concerns
- **Why low priority**: Already follows clean architecture patterns

### usePersonalizedHome.ts (LOW PRIORITY)
- **What's mixed**: Personalization logic + routine integration + UI preference calculation
- **Current state**: Good separation, mostly pure logic
- **Suggestion**: Consider extracting routine integration to separate service
- **Why low priority**: Business logic is already well-contained

---

# Meals

## Shared Core Candidates (KEEP / SHARED)

### Types & Constants
- `/src/features/meals/types/types.ts`
  - **Why portable**: Pure TypeScript definitions
  - **Contains**: `Meal`, `Weekday`, `CreateMealInput`
  - **Examples**: Domain entities, input types

- `/src/features/meals/constants/weekdays.ts`
  - **Why portable**: Pure constants, no dependencies
  - **Contains**: Weekday definitions, arrays
  - **Examples**: Static configuration data

### Data Access Layer
- `/src/features/meals/api.ts`
  - **Why portable**: Clean API surface, type exports
  - **Contains**: Public interface exports
  - **Examples**: Stable API contract

### Store & Actions (Abstracted)
- `/src/features/meals/store/useMealsStore.ts`
- `/src/features/meals/hooks/useMealActions.ts`
- `/src/features/meals/hooks/useMealData.ts`
  - **Why portable**: Zustand store with abstraction hooks
  - **Contains**: `addMeal()`, data selection, state management
  - **Examples**: Pure state management, no UI coupling

### Selectors
- `/src/features/meals/selectors/mealSelectors.ts`
  - **Why portable**: Pure data transformation functions
  - **Contains**: `selectMealsByDay()`, `selectMealsByDays()`, `selectMealStats()`
  - **Examples**: Data grouping, statistics calculation

## Shared UI Contracts

### Meal Planning Patterns
- **Meal Creation Contract**: Form with name, day, type selection and validation
- **Weekday Navigation Contract**: Consistent 7-day navigation with current day highlighting
- **Meal Organization Contract**: Grouped meals by weekday with consistent layout
- **Empty State Contract**: Consistent empty state messaging with action prompts

### State Conventions
- **Meal State Model**: `{ id: string, name: string, day: Weekday, type?: string }`
- **Form State Pattern**: `{ name: string, day: Weekday, type: string, canSave: boolean }`
- **Weekday State**: Consistent weekday selection and navigation
- **Meal Stats Contract**: `{ totalMeals: number, todayMealCount: number }`

## Web-Specific (REBUILD)

### Desktop Layout Components
- `/src/features/meals/pages/MealPlannerPage.tsx`
  - **Why web-only**: Desktop page composition, Card components, web layout
  - **Contains**: Page structure, component composition, web layout
  - **Examples**: `Card`, `Header`, `Button` usage, desktop layout patterns

## Needs Mobile Redesign

### Modal Interactions
- `/src/features/meals/components/AddMealModal.tsx`
  - **Concept survives**: Meal creation form with name, day, type selection
  - **Mobile redesign needed**:
    - Bottom sheet modal instead of dialog
    - Mobile-optimized form layout
    - Touch-friendly dropdown selection
    - Mobile keyboard optimization
    - Gesture-based dismissal

### Meal Display
- **Concept survives**: Week-based meal organization with individual meal items
- **Mobile redesign needed**:
  - Mobile-optimized weekday navigation
  - Swipe gestures for meal management
  - Touch-friendly meal item interactions
  - Mobile-specific empty states
  - Adaptive meal item layouts

## Refactor Candidates (MIXED)

### AddMealModal.tsx (MEDIUM PRIORITY)
- **What's mixed**: Form validation + modal state + UI rendering + async handling
- **Extract to**: `/src/features/meals/services/mealFormService.ts`
- **Suggested extraction**:
  - Move `canSave` validation logic to service
  - Create `validateMealInput()`, `prepareMealForSubmission()`
  - Keep only React state and rendering in component
- **Problem**: 121 lines with form logic, validation, and UI mixed

### MealPlannerPage.tsx (LOW PRIORITY)
- **What's mixed**: Data fetching + page layout + empty state handling
- **Current state**: Reasonably well-separated
- **Suggestion**: Extract empty state logic to service layer
- **Why low priority**: Already uses abstraction hooks effectively

---

## Cross-Cutting Concerns

### Duplicated Logic Patterns
1. **Form validation**: Similar patterns in tasks and meals forms
2. **Modal state management**: Repeated across features
3. **Date/weekday handling**: Similar logic in meals and tasks

### Tight Coupling Issues
1. **BottomSheetDialog**: Mobile-first component that may not translate well to web
2. **Card/Header/Button**: Shared components that may need platform variants
3. **Tailwind styling**: Web-specific styling system

### Migration Recommendations

#### Immediate Actions (High Priority)
1. **Extract TaskSections business logic** to service layer
2. **Extract AddMealModal validation** to service layer  
3. **Create shared form validation utilities** across features

#### Medium Priority
1. **Standardize modal patterns** across features
2. **Create shared date/weekday utilities**
3. **Audit shared components** for platform-specific assumptions

#### Low Priority
1. **Refactor usePersonalizedHome** routine integration
2. **Standardize empty state handling**
3. **Create consistent page layout patterns**

### Architecture Strengths
- Clean separation of domain logic in `/features/*/domain/`
- Well-abstracted store patterns with hooks
- Consistent selector patterns for derived state
- Good type safety across features

---

# Budget

## Shared Core Candidates (KEEP / SHARED)

### Types & Interfaces
- `/src/features/budget/types/types.ts`
  - **Why portable**: Pure TypeScript definitions, platform-agnostic
  - **Contains**: `Expense`, `CreateExpenseInput`
  - **Examples**: Domain entities, input validation types

### Data Access Layer
- `/src/features/budget/api.ts`
  - **Why portable**: Clean API surface, type exports
  - **Contains**: Public interface exports, `BudgetSummary` type
  - **Examples**: Stable API contract

### Store & Actions (Abstracted)
- `/src/features/budget/store/useBudgetStore.ts`
- `/src/features/budget/hooks/useBudgetActions.ts`
- `/src/features/budget/hooks/useBudgetData.ts`
  - **Why portable**: Zustand store with abstraction hooks
  - **Contains**: `addExpense()`, `setIncome()`, budget calculations
  - **Examples**: Pure state management, derived state calculations

### Selectors
- `/src/features/budget/selectors/budgetSelectors.ts`
  - **Why portable**: Pure data transformation functions
  - **Contains**: `selectBudgetSummary()`, percentage calculations
  - **Examples**: Budget aggregation, remaining calculations

## Shared UI Contracts

### Budget Management Patterns
- **Expense Creation Contract**: Form with name and amount validation
- **Income Setting Contract**: Simple amount input with validation
- **Budget Summary Contract**: Consistent display of remaining/total/percentage
- **Transaction Display Contract**: Consistent transaction list with amount formatting

### State Conventions
- **Expense State Model**: `{ id: string, name: string, amount: number }`
- **Budget Summary Model**: `{ spent: number, remaining: number, percentage: number }`
- **Form State Pattern**: `{ name: string, amount: string, canSave: boolean }`
- **Transaction State**: Consistent expense/income categorization

## Web-Specific (REBUILD)

### Desktop Layout Components
- `/src/features/budget/pages/BudgetPage.tsx`
  - **Why web-only**: Desktop page composition, Card components, web layout
  - **Contains**: Page structure, progress bars, grid layouts
  - **Examples**: `ProgressBar`, `Card`, `ListItemBase` usage, desktop layout patterns

## Needs Mobile Redesign

### Modal Interactions
- `/src/features/budget/components/AddExpenseModal.tsx`
- `/src/features/budget/components/AddIncomeModal.tsx`
  - **Concept survives**: Expense/income creation forms with validation
  - **Mobile redesign needed**:
    - Bottom sheet modals instead of dialogs
    - Mobile-optimized number inputs
    - Touch-friendly form layouts
    - Mobile keyboard optimization (numeric keyboard)
    - Gesture-based dismissal

### Budget Display
- **Concept survives**: Budget summary with progress tracking and transaction list
- **Mobile redesign needed**:
  - Mobile-optimized progress indicators
  - Touch-friendly transaction items
  - Mobile-specific budget cards
  - Swipe gestures for transaction management
  - Adaptive information density

## Refactor Candidates (MIXED)

### AddExpenseModal.tsx (MEDIUM PRIORITY)
- **What's mixed**: Form validation + modal state + UI rendering + async handling
- **Extract to**: `/src/features/budget/services/budgetFormService.ts`
- **Suggested extraction**:
  - Move `canSave` validation logic to service
  - Create `validateExpenseInput()`, `prepareExpenseForSubmission()`
  - Keep only React state and rendering in component
- **Problem**: 96 lines with form logic, validation, and UI mixed

### BudgetPage.tsx (LOW PRIORITY)
- **What's mixed**: Data fetching + page layout + empty state handling
- **Current state**: Reasonably well-separated
- **Suggestion**: Extract budget display logic to service layer
- **Why low priority**: Already uses abstraction hooks effectively

---

# Recipes

## Shared Core Candidates (KEEP / SHARED)

### Types & Constants
- `/src/features/recipes/types/types.ts`
  - **Why portable**: Pure TypeScript definitions
  - **Contains**: `Recipe`, `CreateRecipeInput`
  - **Examples**: Domain entities, input types

### Data Access Layer
- `/src/features/recipes/api.ts`
  - **Why portable**: Clean API surface, type exports
  - **Contains**: Public interface exports
  - **Examples**: Stable API contract

### Store & Actions (Abstracted)
- `/src/features/recipes/store/useRecipesStore.ts`
- `/src/features/recipes/hooks/useRecipes.ts`
- `/src/features/recipes/hooks/useApplyRecipe.ts`
  - **Why portable**: Zustand store with abstraction hooks
  - **Contains**: `addRecipe()`, recipe application logic
  - **Examples**: Pure state management, no UI coupling

### Services & Utilities
- `/src/features/recipes/services/recipeWorkflow.ts`
  - **Why portable**: Pure business logic, cross-feature integration
  - **Contains**: `buildRecipeWorkflow()`, ingredient categorization
  - **Examples**: Recipe-to-meal/task/shopping conversion, weekday mapping

- `/src/features/recipes/utils/recipeUtils.ts`
  - **Why portable**: Pure utility functions, no dependencies
  - **Contains**: `parseIngredients()`, `formatIngredients()`
  - **Examples**: String manipulation, data formatting

## Shared UI Contracts

### Recipe Management Patterns
- **Recipe Creation Contract**: Form with name, ingredients (comma-separated), category selection
- **Recipe Application Contract**: One-click recipe-to-meal/task/shopping conversion
- **Ingredient Processing Contract**: Consistent parsing and formatting of ingredient lists
- **Recipe Display Contract**: Consistent recipe card with metadata and action buttons

### State Conventions
- **Recipe State Model**: `{ id: string, name: string, ingredients: string[], category?: string }`
- **Form State Pattern**: `{ name: string, ingredients: string, category: string, canSave: boolean }`
- **Recipe Application State**: Consistent cross-feature workflow execution
- **Ingredient State**: Consistent comma-separated input processing

## Web-Specific (REBUILD)

### Desktop Layout Components
- `/src/features/recipes/pages/RecipesPage.tsx`
  - **Why web-only**: Desktop page composition, Card components, web layout
  - **Contains**: Page structure, recipe grid, empty states
  - **Examples**: `Card`, `Button`, `EmptyState` usage, desktop layout patterns

## Needs Mobile Redesign

### Modal Interactions
- `/src/features/recipes/components/AddRecipeModal.tsx`
  - **Concept survives**: Recipe creation form with name, ingredients, category
  - **Mobile redesign needed**:
    - Bottom sheet modal instead of dialog
    - Mobile-optimized textarea for ingredients
    - Touch-friendly category selection
    - Mobile keyboard optimization
    - Gesture-based dismissal

### Recipe Display
- **Concept survives**: Recipe collection with cards showing metadata and quick actions
- **Mobile redesign needed**:
    - Mobile-optimized recipe cards
    - Touch-friendly "Use Recipe" buttons
    - Swipe gestures for recipe management
    - Mobile-specific empty states
    - Adaptive recipe grid layout

### Recipe Application
- **Concept survives**: One-click recipe application to meals, tasks, shopping
- **Mobile redesign needed**:
    - Mobile-optimized action buttons
    - Touch-friendly workflow execution
    - Mobile-specific success states
    - Gesture-based recipe application

## Refactor Candidates (MIXED)

### AddRecipeModal.tsx (LOW PRIORITY)
- **What's mixed**: Form validation + modal state + UI rendering
- **Current state**: Well-separated with utility usage
- **Suggestion**: Extract form validation logic to service layer
- **Why low priority**: Already uses `parseIngredients()` utility, minimal mixing

### RecipesPage.tsx (LOW PRIORITY)
- **What's mixed**: Data fetching + page layout + empty state handling
- **Current state**: Reasonably well-separated
- **Suggestion**: Extract recipe display logic to service layer
- **Why low priority**: Already uses abstraction hooks effectively

---

# Shopping

## Shared Core Candidates (KEEP / SHARED)

### Types & Constants
- `/src/features/shopping/types/types.ts`
  - **Why portable**: Pure TypeScript definitions
  - **Contains**: `ShoppingItem`, `ShoppingCategory`, `CreateShoppingItemInput`
  - **Examples**: Domain entities, category types, input types

### Data Access Layer
- `/src/features/shopping/api.ts`
  - **Why portable**: Clean API surface, type exports
  - **Contains**: Public interface exports
  - **Examples**: Stable API contract

### Store & Actions (Abstracted)
- `/src/features/shopping/store/useShoppingStore.ts`
- `/src/features/shopping/hooks/useShoppingActions.ts`
- `/src/features/shopping/hooks/useShoppingData.ts`
- `/src/features/shopping/hooks/useShoppingList.ts`
  - **Why portable**: Zustand store with abstraction hooks
  - **Contains**: `addShoppingItem()`, `toggleShoppingItem()`, data selection
  - **Examples**: Pure state management, no UI coupling

### Selectors
- `/src/features/shopping/selectors/shoppingSelectors.ts`
  - **Why portable**: Pure data transformation functions
  - **Contains**: Shopping list filtering, categorization
  - **Examples**: Data grouping, status calculations

## Shared UI Contracts

### Shopping List Patterns
- **Item Creation Contract**: Form with name and category selection
- **Item Completion Contract**: Checkbox/toggle with immediate visual feedback
- **Category Organization Contract**: Consistent grouping by Groceries/Household
- **List State Contract**: Consistent display of completed vs incomplete items

### State Conventions
- **Shopping Item Model**: `{ id: string, name: string, done: boolean, category: ShoppingCategory }`
- **Form State Pattern**: `{ name: string, category: ShoppingCategory, canSave: boolean }`
- **List State Model**: `{ items: ShoppingItem[], incompleteCount: number, completedCount: number }`
- **Category State**: Consistent Groceries/Household categorization

## Web-Specific (REBUILD)

### Desktop Layout Components
- `/src/features/shopping/pages/ShoppingListPage.tsx`
  - **Why web-only**: Desktop page layout, list composition, web interactions
  - **Contains**: Page structure, item management, desktop layout
  - **Examples**: List rendering, modal integration, web layout patterns

## Needs Mobile Redesign

### Shopping List Items
- `/src/features/shopping/components/ShoppingRow.tsx`
  - **Concept survives**: Shopping item with checkbox, name, category display
  - **Mobile redesign needed**:
    - Larger touch targets (44px minimum)
    - Swipe gestures for completion
    - Thumb-friendly checkbox areas
    - Mobile-optimized item spacing
    - Pull-to-refresh functionality

### Modal Interactions
- `/src/features/shopping/components/AddShoppingItemModal.tsx`
  - **Concept survives**: Item creation form with name and category selection
  - **Mobile redesign needed**:
    - Bottom sheet modal instead of dialog
    - Mobile-optimized form layout
    - Touch-friendly category selection
    - Mobile keyboard optimization
    - Gesture-based dismissal

### Shopping List Display
- **Concept survives**: Organized shopping list with category grouping and completion tracking
- **Mobile redesign needed**:
    - Mobile-optimized list layout
    - Swipe-to-complete functionality
    - Mobile-specific empty states
    - Touch-friendly category headers
    - Mobile pagination for large lists

## Refactor Candidates (MIXED)

### ShoppingRow.tsx (LOW PRIORITY)
- **What's mixed**: Data presentation + interaction handling + styling
- **Current state**: Well-separated with shared components
- **Suggestion**: Extract interaction logic to service layer
- **Why low priority**: Already uses `CheckboxRow` abstraction, minimal mixing

---

# Bills

## Shared Core Candidates (KEEP / SHARED)

### Types & Interfaces
- `/src/features/bills/types/types.ts`
  - **Why portable**: Pure TypeScript definitions, shared date types
  - **Contains**: `Bill`, `CreateBillInput`, `DateKey` usage
  - **Examples**: Domain entities, input validation types

### Data Access Layer
- `/src/features/bills/index.ts`
  - **Why portable**: Clean API surface, type exports
  - **Contains**: Public interface exports
  - **Examples**: Stable API contract

### Store & Hooks (Abstracted)
- `/src/features/bills/store/useBillsStore.ts`
- `/src/features/bills/hooks/useBills.ts`
  - **Why portable**: Zustand store with abstraction hooks
  - **Contains**: `addBill()`, bill view transformation
  - **Examples**: Pure state management, data formatting

## Shared UI Contracts

### Bill Management Patterns
- **Bill Creation Contract**: Form with name, amount, and date selection
- **Bill Display Contract**: Consistent bill list with amount formatting and due dates
- **Date Integration Contract**: Consistent date handling with shared DateKey system
- **View Formatting Contract**: Consistent bill-to-view transformation

### State Conventions
- **Bill State Model**: `{ id: string, name: string, amount: number, date: DateKey }`
- **Form State Pattern**: `{ name: string, amount: string, date: DateKey, canSave: boolean }`
- **Bill View Model**: `{ key: string, name: string, amount: string, index: number }`
- **Date State**: Consistent DateKey usage across features

## Web-Specific (REBUILD)

### Desktop Layout Components
- **CRITICAL FINDING**: No desktop-only layout components identified
- All bill components appear to be mobile-friendly or require redesign

## Needs Mobile Redesign

### Modal Interactions
- `/src/features/bills/components/AddBillModal/` (entire directory)
- `/src/features/bills/components/AddBillModal.tsx`
  - **Concept survives**: Bill creation form with name, amount, date selection
  - **Mobile redesign needed**:
    - Bottom sheet modal instead of dialog
    - Mobile-optimized date picker
    - Touch-friendly form layout
    - Mobile keyboard optimization
    - Gesture-based dismissal

### Bill Display
- **Concept survives**: Bill list with amount formatting and due date display
- **Mobile redesign needed**:
    - Mobile-optimized bill items
    - Touch-friendly bill management
    - Mobile-specific empty states
    - Swipe gestures for bill actions
    - Mobile date formatting

## Refactor Candidates (MIXED)

### useBills.ts (LOW PRIORITY)
- **What's mixed**: Data transformation + view formatting + state access
- **Extract to**: `/src/features/bills/services/billViewService.ts`
- **Suggested extraction**:
  - Move `toBillViews()` function to service
  - Create `formatBillForDisplay()`, `calculateBillMetrics()`
  - Keep only data access in hook
- **Problem**: Mixing data transformation with view formatting

---

# Insights

## Shared Core Candidates (KEEP / SHARED)

### Types & Interfaces
- `/src/features/insights/types/types.ts`
  - **Why portable**: Pure TypeScript definitions, comprehensive insight model
  - **Contains**: `Insight`, `SmartSummary`, `Recommendation`, `InsightState`
  - **Examples**: Cross-feature insight types, priority systems

### Business Logic Engines
- `/src/features/insights/insights.utils.ts`
  - **Why portable**: Pure business logic, cross-feature analysis
  - **Contains**: Insight generation, trend analysis, smart messaging
  - **Examples**: Pattern detection, recommendation algorithms

- `/src/features/insights/smartMessaging.utils.ts`
  - **Why portable**: Pure message generation logic
  - **Contains**: Smart message templates, contextual messaging
  - **Examples**: Dynamic message creation, user personalization

### Streaks System
- `/src/features/insights/streaks.types.ts`
- `/src/features/insights/streaks.utils.ts`
  - **Why portable**: Pure streak calculation logic
  - **Contains**: Streak tracking, consistency metrics
  - **Examples**: Streak algorithms, trend calculations

### Data Stores
- `/src/features/insights/useStreaksStore.ts`
- `/src/features/insights/useWeeklySummary.ts`
  - **Why portable**: Zustand stores with abstraction hooks
  - **Contains**: Insight state, weekly summaries
  - **Examples**: Pure state management, derived calculations

## Shared UI Contracts

### Insight Display Patterns
- **Insight Card Contract**: Consistent display of title, description, priority, and actions
- **Smart Summary Contract**: Consistent display of focus areas, highlights, and recommendations
- **Streak Display Contract**: Consistent streak visualization with progress indicators
- **Message Delivery Contract**: Consistent smart messaging with contextual relevance

### State Conventions
- **Insight State Model**: `{ id: string, type: InsightType, priority: InsightPriority, title: string, description: string, actionable: boolean }`
- **Summary State Model**: `{ focusArea: string, summary: string, highlights: string[], concerns: string[], recommendations: string[] }`
- **Streak State Model**: Consistent streak tracking with current/longest lengths
- **Message State**: Consistent smart message delivery with relevance scoring

## Web-Specific (REBUILD)

### Desktop Layout Components
- `/src/features/insights/components/InsightsCard.container.tsx`
- `/src/features/insights/components/InsightsCard.view.tsx`
  - **Why web-only**: Container/view pattern, web-specific rendering
  - **Contains**: Card layouts, web styling, interaction patterns
  - **Examples**: Desktop card layouts, hover states, web composition

## Needs Mobile Redesign

### Insight Cards
- **Concept survives**: Insight display with title, description, priority, and action buttons
- **Mobile redesign needed**:
    - Mobile-optimized card layouts
    - Touch-friendly action buttons
    - Mobile-specific priority indicators
    - Swipe gestures for insight dismissal
    - Adaptive card sizing

### Smart Summaries
- **Concept survives**: Focus area summaries with highlights and recommendations
- **Mobile redesign needed**:
    - Mobile-optimized summary layouts
    - Touch-friendly recommendation actions
    - Mobile-specific highlight displays
    - Adaptive information density

### Streak Visualization
- **Concept survives**: Streak tracking with progress indicators and momentum display
- **Mobile redesign needed**:
    - Mobile-optimized streak displays
    - Touch-friendly progress indicators
    - Mobile-specific momentum visualization
    - Gesture-based streak interactions

## Refactor Candidates (MIXED)

### InsightsCard Components (LOW PRIORITY)
- **What's mixed**: Data processing + UI rendering + interaction handling
- **Current state**: Well-separated with container/view pattern
- **Suggestion**: Extract insight processing to service layer
- **Why low priority**: Already follows good separation patterns

---

# Intelligence

## Shared Core Candidates (KEEP / SHARED)

### Types & Interfaces
- `/src/features/intelligence/types/intelligence.types.ts`
  - **Why portable**: Comprehensive TypeScript definitions, AI/ML types
  - **Contains**: `SmartInsight`, `Recommendation`, `Pattern`, `IntelligenceContext`
  - **Examples**: Cross-feature data models, confidence scoring, temporal context

### Intelligence Engines
- `/src/features/intelligence/intelligenceEngine.ts`
  - **Why portable**: Pure AI/ML logic, no UI dependencies
  - **Contains**: Core intelligence processing, insight generation
  - **Examples**: Pattern analysis, recommendation algorithms

- `/src/features/intelligence/insightGenerator.ts`
  - **Why portable**: Pure insight generation logic
  - **Contains**: Smart insight creation, contextual analysis
  - **Examples**: Dynamic insight generation, user behavior analysis

- `/src/features/intelligence/patternDetection.ts`
  - **Why portable**: Pure pattern recognition algorithms
  - **Contains**: User behavior patterns, trend detection
  - **Examples**: Temporal patterns, category preferences, consistency analysis

- `/src/features/intelligence/recommendationEngine.ts`
  - **Why portable**: Pure recommendation algorithms
  - **Contains**: Personalized recommendations, impact scoring
  - **Examples**: Action suggestions, priority calculations, confidence scoring

### Data Access Layer
- `/src/features/intelligence/index.ts`
- `/src/features/intelligence/hooks/useIntelligence.ts`
  - **Why portable**: Clean API surface, abstraction hooks
  - **Contains**: Public interface, data access patterns
  - **Examples**: Stable API contract, state management

## Shared UI Contracts

### Intelligence Display Patterns
- **Smart Insight Contract**: Consistent display of AI-generated insights with confidence scoring
- **Recommendation Contract**: Consistent display of actionable recommendations with impact/effort indicators
- **Pattern Display Contract**: Consistent visualization of detected patterns with frequency data
- **Confidence Indicators Contract**: Consistent display of confidence levels and reliability scores

### State Conventions
- **Smart Insight Model**: `{ id: string, type: string, title: string, description: string, severity: string, confidence: number }`
- **Recommendation Model**: `{ id: string, type: string, title: string, reasoning: string, confidence: number, priority: string }`
- **Pattern Model**: `{ id: string, type: string, description: string, confidence: number, data: { pattern: unknown, frequency: number } }`
- **Context Model**: Consistent temporal and user preference context across intelligence features

## Web-Specific (REBUILD)

**CRITICAL FINDING**: No UI components in intelligence feature
- The intelligence feature contains only pure business logic
- All UI components live in shared component directories
- **Migration impact**: Intelligence UI components need to be identified in shared directories

## Needs Mobile Redesign

**CRITICAL FINDING**: Intelligence UI needs to be identified in shared components
- **Concept survives**: AI-generated insights, recommendations, and pattern detection
- **Mobile redesign needed**:
    - Mobile-optimized insight cards
    - Touch-friendly recommendation actions
    - Mobile-specific pattern visualizations
    - Adaptive confidence indicators
    - Gesture-based insight interactions

## Refactor Candidates (MIXED)

### None Identified
- **Current state**: Excellent separation of concerns
- **Architecture**: Pure business logic with no UI mixing
- **Migration readiness**: Fully prepared for cross-platform sharing

---

# Momentum

## Shared Core Candidates (KEEP / SHARED)

### Types & Interfaces
- `/src/features/momentum/types/momentum.types.ts`
  - **Why portable**: Comprehensive TypeScript definitions, scoring system
  - **Contains**: `DailyMomentumScore`, `Streak`, `MomentumTrend`, `ConsistencyMetrics`
  - **Examples**: Scoring algorithms, trend analysis, streak tracking

### Business Logic Engines
- `/src/features/momentum/momentumEngine.ts`
  - **Why portable**: Pure momentum calculation logic
  - **Contains**: Score calculation, trend analysis, momentum levels
  - **Examples**: Daily scoring, momentum algorithms, level calculations

- `/src/features/momentum/dailyScore.ts`
  - **Why portable**: Pure daily score calculation
  - **Contains**: Score algorithms, activity weighting
  - **Examples**: Activity contribution, score normalization

- `/src/features/momentum/streakCalculator.ts`
  - **Why portable**: Pure streak calculation logic
  - **Contains**: Streak algorithms, consistency tracking
  - **Examples**: Streak length, momentum levels, trend directions

### Analytics & Insights
- `/src/features/momentum/consistencyMetrics.ts`
- `/src/features/momentum/weeklyConsistency.ts`
- `/src/features/momentum/trendInsights.ts`
- `/src/features/momentum/trendSummary.ts`
  - **Why portable**: Pure analytics logic, no UI dependencies
  - **Contains**: Pattern analysis, trend calculations, insight generation
  - **Examples**: Consistency scoring, trend analysis, momentum insights

### Data Processing
- `/src/features/momentum/progressSelectors.ts`
  - **Why portable**: Pure data transformation functions
  - **Contains**: Progress calculation, data aggregation
  - **Examples**: Derived state, metrics calculation

### Store & Hooks
- `/src/features/momentum/store/useMomentumStore.ts`
- `/src/features/momentum/hooks/` (directory)
  - **Why portable**: Zustand store with abstraction hooks
  - **Contains**: State management, data access
  - **Examples**: Pure state management, computed properties

## Shared UI Contracts

### Momentum Display Patterns
- **Score Display Contract**: Consistent display of daily momentum scores with level indicators
- **Streak Visualization Contract**: Consistent streak tracking with current/longest lengths
- **Trend Display Contract**: Consistent trend visualization with direction and strength indicators
- **Consistency Metrics Contract**: Consistent display of consistency patterns and insights

### State Conventions
- **Daily Score Model**: `{ date: string, totalScore: number, categoryScores: Record<string, number>, momentumLevel: string }`
- **Streak Model**: `{ type: string, currentLength: number, longestLength: number, isActive: boolean }`
- **Trend Model**: `{ period: string, trendDirection: string, trendStrength: number, averageScore: number }`
- **Consistency Model**: `{ overallConsistency: number, categoryConsistency: Record<string, number> }`

## Web-Specific (REBUILD)

### Desktop Layout Components
- `/src/features/momentum/components/` (directory)
  - **Why web-only**: Momentum visualization, charts, progress displays
  - **Contains**: Charts, progress bars, trend visualizations
  - **Examples**: Web-specific charts, desktop layouts, interactive displays

## Needs Mobile Redesign

### Momentum Visualization
- **Concept survives**: Daily momentum scores, streak tracking, trend visualization, consistency metrics
- **Mobile redesign needed**:
    - Mobile-optimized score displays
    - Touch-friendly streak indicators
    - Mobile-specific trend charts
    - Adaptive consistency visualizations
    - Gesture-based momentum interactions

### Progress Tracking
- **Concept survives**: Activity contribution tracking, momentum level progression, insights generation
- **Mobile redesign needed**:
    - Mobile-optimized progress indicators
    - Touch-friendly activity displays
    - Mobile-specific insight cards
    - Swipe-based trend navigation
    - Adaptive information density

## Refactor Candidates (MIXED)

### None Identified
- **Current state**: Excellent separation of concerns
- **Architecture**: Pure business logic with clear boundaries
- **Migration readiness**: Fully prepared for cross-platform sharing

---

# Onboarding

## Shared Core Candidates (KEEP / SHARED)

### Types & Interfaces
- `/src/features/onboarding/types/onboarding.types.ts`
  - **Why portable**: Comprehensive TypeScript definitions, user preference model
  - **Contains**: `OnboardingData`, `FocusArea`, `ProductivityGoal`, `PersonalizedDefaults`
  - **Examples**: User preferences, personalization data, flow control

### Business Logic Services
- `/src/features/onboarding/utils/` (directory)
  - **Why portable**: Pure personalization logic, no UI dependencies
  - **Contains**: Default generation, preference processing, personalization algorithms
  - **Examples**: Smart defaults, user profiling, preference mapping

### Data Stores
- `/src/features/onboarding/store/` (directory)
- `/src/features/onboarding/hooks/` (directory)
  - **Why portable**: Zustand stores with abstraction hooks
  - **Contains**: Onboarding state, flow management, data persistence
  - **Examples**: Progress tracking, step validation, data management

## Shared UI Contracts

### Onboarding Flow Patterns
- **Step Validation Contract**: Consistent validation rules for each onboarding step
- **Progress Tracking Contract**: Consistent progress indicators and step completion states
- **Personalization Contract**: Consistent preference collection and default generation
- **Flow Navigation Contract**: Consistent step navigation with skip/next/back actions

### State Conventions
- **Onboarding State Model**: `{ currentStep: number, isCompleted: boolean, data: Partial<OnboardingData> }`
- **Step State Pattern**: `{ isComplete: boolean, canSkip: boolean, canProceed: boolean }`
- **Personalization State**: `{ focusAreas: FocusArea[], productivityGoals: ProductivityGoal[], preferredModules: PreferredModule[] }`
- **Flow Control**: Consistent step progression and validation logic

## Web-Specific (REBUILD)

### Desktop Layout Components
- `/src/features/onboarding/OnboardingScreen.tsx`
- `/src/features/onboarding/components/` (directory)
  - **Why web-only**: Desktop onboarding flow, step screens, web interactions
  - **Contains**: Multi-step flow, form screens, progress indicators
  - **Examples**: Web-specific onboarding patterns, desktop layouts

## Needs Mobile Redesign

### Onboarding Flow
- **Concept survives**: Multi-step onboarding with preference collection and personalization
- **Mobile redesign needed**:
    - Mobile-optimized step layouts
    - Touch-friendly form inputs
    - Mobile-specific progress indicators
    - Swipe gestures for step navigation
    - Adaptive step content

### Preference Collection
- **Concept survives**: Focus area selection, productivity goals, module preferences, daily cadence
- **Mobile redesign needed**:
    - Mobile-optimized selection interfaces
    - Touch-friendly option cards
    - Mobile-specific preference displays
    - Gesture-based selection
    - Adaptive form layouts

### Personalization
- **Concept survives**: Smart defaults generation and user profiling
- **Mobile redesign needed**:
    - Mobile-optimized personalization results
    - Touch-friendly default displays
    - Mobile-specific preference summaries
    - Swipe-based confirmation flows

## Refactor Candidates (MIXED)

### OnboardingScreen.tsx (MEDIUM PRIORITY)
- **What's mixed**: Flow control + form handling + UI rendering + state management
- **Extract to**: `/src/features/onboarding/services/onboardingFlowService.ts`
- **Suggested extraction**:
  - Move step validation logic to service
  - Create `validateOnboardingStep()`, `processOnboardingData()`
  - Extract flow control logic
  - Keep only React state and rendering in component
- **Problem**: Large component mixing business logic with presentation

---

# Routines

## Shared Core Candidates (KEEP / SHARED)

### Types & Interfaces
- `/src/features/routines/types/routineTypes.ts`
  - **Why portable**: Comprehensive TypeScript definitions, routine system model
  - **Contains**: `RoutineTemplate`, `RoutineInstance`, `FocusSession`, `RecurringTaskTemplate`
  - **Examples**: Complex domain model, status management, template system

### Domain Logic
- `/src/features/routines/domain/` (directory)
  - **Why portable**: Pure business logic, routine algorithms
  - **Contains**: Routine execution, template processing, focus session logic
  - **Examples**: Routine scheduling, step processing, momentum calculation

### Integration Services
- `/src/features/routines/integration/` (directory)
  - **Why portable**: Cross-feature integration, no UI dependencies
  - **Contains**: Task integration, calendar sync, momentum calculation
  - **Examples**: Routine-to-task conversion, focus session integration

### Data Processing
- `/src/features/routines/selectors/` (directory)
- `/src/features/routines/utils/` (directory)
  - **Why portable**: Pure data transformation, utility functions
  - **Contains**: Routine filtering, status calculation, time utilities
  - **Examples**: Progress calculation, status aggregation, time-based filtering

### Store & Hooks
- `/src/features/routines/store/` (directory)
- `/src/features/routines/hooks/` (directory)
  - **Why portable**: Zustand stores with abstraction hooks
  - **Contains**: Complex state management, routine lifecycle
  - **Examples**: Template management, instance tracking, focus session handling

## Shared UI Contracts

### Routine Management Patterns
- **Template Creation Contract**: Consistent routine template creation with steps and timing
- **Instance Execution Contract**: Consistent routine instance tracking with step completion
- **Focus Session Contract**: Consistent focus session management with duration and quality tracking
- **Progress Tracking Contract**: Consistent routine progress visualization with momentum integration

### State Conventions
- **Routine Template Model**: `{ id: string, name: string, type: string, steps: RoutineStep[], estimatedDuration: number }`
- **Routine Instance Model**: `{ id: string, templateId: string, date: string, status: string, steps: RoutineInstanceStep[] }`
- **Focus Session Model**: `{ id: string, title: string, scheduledStart: string, scheduledEnd: string, status: string }`
- **Progress Model**: Consistent progress calculation with momentum contribution

## Web-Specific (REBUILD)

**CRITICAL FINDING**: No UI components in routines feature
- The routines feature contains only business logic and data management
- All UI components live in shared component directories
- **Migration impact**: Routines UI components need to be identified in shared directories

## Needs Mobile Redesign

**CRITICAL FINDING**: Routines UI needs to be identified in shared components
- **Concept survives**: Routine templates, instances, focus sessions, progress tracking
- **Mobile redesign needed**:
    - Mobile-optimized routine templates
    - Touch-friendly step completion
    - Mobile-specific focus session timers
    - Swipe-based routine management
    - Adaptive progress displays

### Routine Templates
- **Concept survives**: Routine template creation with steps, timing, and categorization
- **Mobile redesign needed**:
    - Mobile-optimized template creation
    - Touch-friendly step management
    - Mobile-specific time selection
    - Gesture-based template editing

### Focus Sessions
- **Concept survives**: Focus session management with duration tracking and quality assessment
- **Mobile redesign needed**:
    - Mobile-optimized session timers
    - Touch-friendly quality controls
    - Mobile-specific session displays
    - Swipe-based session management

### Progress Tracking
- **Concept survives**: Routine progress visualization with momentum integration
- **Mobile redesign needed**:
    - Mobile-optimized progress indicators
    - Touch-friendly momentum displays
    - Mobile-specific progress charts
    - Adaptive progress layouts

## Refactor Candidates (MIXED)

### None Identified
- **Current state**: Excellent separation of concerns
- **Architecture**: Pure business logic with comprehensive domain modeling
- **Migration readiness**: Fully prepared for cross-platform sharing

---

# Today

## Shared Core Candidates (KEEP / SHARED)

### Data Orchestration
- `/src/features/today/hooks/useTodayData.ts`
  - **Why portable**: Pure data orchestration, no UI dependencies
  - **Contains**: Cross-feature data aggregation, focus calculation
  - **Examples**: Multi-feature integration, priority calculation, summary generation

### Types & Interfaces
- `TodayData` type in useTodayData.ts
  - **Why portable**: Pure TypeScript definitions
  - **Contains**: Focus metrics, summary data, cross-feature types
  - **Examples**: Aggregated data models, calculation results

## Shared UI Contracts

### Today Dashboard Patterns
- **Focus Calculation Contract**: Dynamic focus calculation based on tasks, budget, and meals
- **Summary Display Contract**: Consistent display of cross-feature summary data
- **Priority Determination Contract**: Consistent priority calculation across features
- **Data Aggregation Contract**: Consistent cross-feature data orchestration

### State Conventions
- **Today Data Model**: `{ focus: { percentage: number, label: string, subtext: string }, summary: { tasks: object, meals: object, budget: object, shopping: object } }`
- **Focus State**: Consistent focus calculation with percentage and messaging
- **Summary State**: Consistent cross-feature summary with completed/total metrics
- **Aggregation State**: Consistent data orchestration across features

## Web-Specific (REBUILD)

### Desktop Layout Components
- `/src/features/today/components/` (directory)
  - **Why web-only**: Today dashboard, focus displays, summary cards
  - **Contains**: Dashboard layout, progress displays, interactive elements
  - **Examples**: Web-specific dashboard patterns, desktop layouts

## Needs Mobile Redesign

### Today Dashboard
- **Concept survives**: Cross-feature today dashboard with focus areas and summary data
- **Mobile redesign needed**:
    - Mobile-optimized dashboard layout
    - Touch-friendly focus indicators
    - Mobile-specific summary cards
    - Swipe-based feature navigation
    - Adaptive information density

### Focus Display
- **Concept survives**: Dynamic focus calculation with percentage and contextual messaging
- **Mobile redesign needed**:
    - Mobile-optimized focus indicators
    - Touch-friendly progress displays
    - Mobile-specific focus messaging
    - Gesture-based focus interactions

### Summary Cards
- **Concept survives**: Cross-feature summary with completed/total metrics and quick actions
- **Mobile redesign needed**:
    - Mobile-optimized summary cards
    - Touch-friendly quick actions
    - Mobile-specific metric displays
    - Swipe-based card navigation

## Refactor Candidates (MIXED)

### useTodayData.ts (LOW PRIORITY)
- **What's mixed**: Data orchestration + calculation logic + cross-feature integration
- **Current state**: Well-separated with memoization
- **Suggestion**: Extract calculation logic to service layer
- **Why low priority**: Already uses abstraction hooks effectively, minimal mixing

---

## Cross-Cutting Concerns

### Shared UI Contracts Across Features

#### Form Patterns
- **Validation Contract**: Consistent real-time validation with error messaging
- **Input State Contract**: `{ value: string, error: string | null, touched: boolean, canSave: boolean }`
- **Submission Contract**: Consistent async form submission with loading states
- **Error Handling Contract**: Consistent error display and recovery patterns

#### Modal Patterns
- **Modal State Contract**: `{ open: boolean, loading: boolean, data: FormData }`
- **Bottom Sheet Contract**: Mobile-first modal pattern with gesture dismissal
- **Form Modal Contract**: Consistent form-in-modal with validation and submission
- **Confirmation Contract**: Consistent confirmation dialogs with action buttons

#### Loading & Empty States
- **Loading State Contract**: Consistent loading indicators and skeleton screens
- **Empty State Contract**: Consistent empty state messaging with action prompts
- **Error State Contract**: Consistent error display with retry mechanisms
- **Success State Contract**: Consistent success feedback with action options

#### Data Display Patterns
- **Card Display Contract**: Consistent card layouts with headers, content, and actions
- **List Display Contract**: Consistent list items with selection and actions
- **Progress Display Contract**: Consistent progress indicators with percentage and status
- **Summary Display Contract**: Consistent summary cards with metrics and quick actions

### Platform-Specific Implementation Needs

#### Web-Specific Patterns (REBUILD)
- **Hover Interactions**: Desktop hover states and tooltips
- **Keyboard Navigation**: Web keyboard shortcuts and tab navigation
- **Desktop Layouts**: Multi-column layouts, sidebars, desktop navigation
- **Web Components**: Tables, dropdowns, complex form controls

#### Mobile-Specific Patterns (REDESIGN)
- **Touch Targets**: 44px minimum touch targets for all interactive elements
- **Gesture Support**: Swipe, pull-to-refresh, pinch-to-zoom interactions
- **Mobile Navigation**: Bottom tabs, slide-out menus, mobile-first navigation
- **Mobile Modals**: Bottom sheets, mobile-optimized forms, gesture dismissal

### Migration Recommendations

#### Immediate Actions (High Priority)
1. **Extract TaskSections business logic** to service layer
2. **Extract AddMealModal validation** to service layer  
3. **Extract AddExpenseModal validation** to service layer
4. **Extract OnboardingScreen flow logic** to service layer
5. **Create shared form validation utilities** across features

#### Medium Priority
1. **Standardize modal patterns** across features with platform variants
2. **Create shared date/weekday utilities** for cross-feature consistency
3. **Audit shared components** for platform-specific assumptions
4. **Extract useBills view formatting** to service layer
5. **Create cross-feature integration utilities** with consistent contracts

#### Low Priority
1. **Refactor usePersonalizedHome** routine integration
2. **Standardize empty state handling** with mobile variants
3. **Create consistent page layout patterns** for mobile adaptation
4. **Extract useTodayData calculations** to service layer
5. **Optimize modal state management** with platform-specific patterns

### Architecture Strengths

#### Behavioral Systems (The True Moat)
- **Intelligence Engine**: Pure AI/ML logic with no UI coupling
- **Momentum System**: Comprehensive scoring and streak tracking
- **Routines System**: Complex domain modeling with excellent separation
- **Cross-Feature Integration**: Well-orchestrated data flows
- **Personalization Engine**: Smart defaults and user profiling

#### Technical Excellence
- Clean separation of domain logic in `/features/*/domain/`
- Well-abstracted store patterns with hooks
- Consistent selector patterns for derived state
- Good type safety across features
- Comprehensive shared UI contracts

### Architecture Risks

#### Migration Complexity
- Mixed components (TaskSections, AddMealModal, AddExpenseModal, OnboardingScreen) will complicate mobile migration
- Web-specific UI patterns in shared component directories
- Modal pattern duplication across 5+ features
- Form validation logic scattered across features

#### Platform Assumptions
- BottomSheetDialog usage assumes mobile-first patterns
- Hover states and desktop interactions throughout
- Web-specific styling and layout assumptions
- Touch interaction gaps in current implementations

### Key Insight: The Behavioral Systems Are Your Moat

The true reusable value of this application lies in the behavioral systems:

1. **Intelligence**: AI/ML engines that generate insights and recommendations
2. **Momentum**: Sophisticated scoring, streak tracking, and consistency metrics
3. **Routines**: Complex domain modeling for habit formation and tracking
4. **Orchestration**: Cross-feature data coordination and personalization
5. **Planning Relationships**: Recipe-to-meal/task/shopping workflows

These systems form the competitive advantage and must be preserved as pure shared core. The UI components are replaceable, but the behavioral intelligence is the moat.