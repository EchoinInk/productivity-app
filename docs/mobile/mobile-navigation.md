# Mobile Navigation Architecture

## Navigation Philosophy

The mobile navigation architecture prioritizes cognitive efficiency and ADHD-friendly design patterns:

- **Prioritize Today flow**: Today screen is the primary entry point, reducing decision fatigue
- **Reduce cognitive load**: Minimize choices and突出 the most important actions
- **Minimize tab switching**: Keep frequently used actions within thumb reach
- **Support one-handed usage**: All primary actions accessible with thumb on bottom edge
- **Optimize for low-energy states**: Quick capture when motivation is low
- **Surface most important actions first**: Quick add buttons prominently placed
- **Reduce deep navigation stacks**: Max 2-3 levels deep for any flow
- **Emphasize quick capture and quick return**: Fast entry and exit for micro-tasks

## Primary Tabs

### Configuration 1: Today / Tasks / Meals / Progress / More

**Strengths:**
- Today as primary entry point reduces decision making
- Clear separation of planning (Tasks) and tracking (Meals)
- Progress tab consolidates insights and momentum
- More tab houses secondary features without cluttering primary flow

**Tradeoffs:**
- 5 tabs may be crowded on smaller screens
- Progress tab may feel less actionable than others
- More tab could become a dumping ground

**Cognitive Load Impact:**
- Low: Clear hierarchy with Today as anchor
- Medium: 5 tabs require more visual scanning

**Thumb Ergonomics:**
- Excellent: All tabs in thumb zone
- Today and Tasks in prime positions

### Configuration 2: Home / Plan / Track / Insights / Profile

**Strengths:**
- Action-oriented naming (Plan/Track)
- Clear separation of planning vs tracking
- Insights as dedicated tab emphasizes behavioral value
- Profile tab for settings and preferences

**Tradeoffs:**
- Less familiar naming may increase learning curve
- Home vs Today distinction may be confusing
- Insights tab may have low daily usage

**Cognitive Load Impact:**
- Medium: More abstract naming requires interpretation
- Low: Clear action categories

**Thumb Ergonomics:**
- Good: All tabs accessible
- Plan/Track in prime positions for frequent use

### Configuration 3: Today / Plan / Track / More

**Strengths:**
- Minimal 4-tab structure reduces cognitive load
- Today as clear primary entry point
- Plan/Track action-oriented naming
- More tab consolidates secondary features

**Tradeoffs:**
- More tab becomes crowded (Settings, Profile, Recipes, Shopping, Budget)
- Less direct access to insights and progress
- May require deeper navigation for secondary features

**Cognitive Load Impact:**
- Low: Minimal tab count
- Medium: More tab requires more decisions

**Thumb Ergonomics:**
- Excellent: All tabs in thumb zone
- Today/Plan/Track in prime positions

## Global Quick Add

### Floating Action Button Design

**Primary FAB:**
- Centered bottom position for thumb reach
- Expands to reveal quick capture options
- Default action: Add Task (most frequent)
- Haptic feedback on expansion

**Quick Capture Menu:**
- **Task**: Default, pre-selected for today
- **Meal**: Pre-selected for current meal period
- **Expense**: Pre-selected for today's date
- **Shopping Item**: Pre-selected for last used category

**Bottom Sheet Creation Flows:**
- Slide up from bottom with contextual form
- Predictive defaults based on usage patterns
- One-tap creation for common patterns
- Swipe down to dismiss

**Predictive Defaults:**
- Date = Today (unless time suggests otherwise)
- Category = Last used category
- Priority = Medium (unless user prefers high)
- Time = Current time for tasks
- Meal period = Current time of day

**Why Quick Capture is Critical for ADHD UX:**
- Reduces friction when motivation is low
- Captures ideas before they're forgotten
- Minimizes decision fatigue with smart defaults
- Provides immediate gratification of task completion
- Supports working memory by externalizing thoughts
- Enables micro-interactions that build momentum

## Navigation Patterns

### Tab Navigation
- Bottom tab bar with 4-5 primary destinations
- Active state with clear visual feedback
- Badge notifications for actionable items
- Haptic feedback on tab switching

### Stack Navigation
- Max 2-3 levels deep for any flow
- Breadcrumb navigation for deep stacks
- Swipe-to-go-back gesture support
- Predictable back button behavior

### Modal Navigation
- Bottom sheets for creation flows
- Full-screen modals for complex forms
- Overlay modals for confirmations
- Gesture-based dismissal

### Bottom Sheets
- Creation flows (Task, Meal, Expense, Shopping)
- Quick actions and contextual menus
- Filter and sort options
- Swipe-to-expand for additional options

### Gesture-Based Transitions
- Swipe to go back
- Swipe actions on list items
- Pull-to-refresh for data updates
- Swipe-to-complete for tasks

### Deep Link Handling
- Direct navigation to specific features
- Context preservation when navigating
- Return to previous context after action
- Deep linking to specific dates or items

### Return-to-Context Behavior
- Always return to previous screen after action
- Preserve scroll position and filters
- Maintain selected date or category
- Quick return to Today after task completion

## Screen Hierarchy

### Today
- **Level**: Root tab
- **Depth**: 0 (primary destination)
- **Actions**: Quick add, focus management, insights preview

### Tasks
- **Level**: Root tab
- **Depth**: 1-2 (Today → Tasks → Task Details)
- **Actions**: Task management, calendar navigation, filtering

### Calendar
- **Level**: Stack under Tasks
- **Depth**: 2 (Tasks → Calendar)
- **Actions**: Date selection, task scheduling

### Meals
- **Level**: Root tab
- **Depth**: 1-2 (Meals → Meal Details)
- **Actions**: Meal planning, recipe application

### Progress / Insights
- **Level**: Root tab or Stack
- **Depth**: 1-2 (Progress → Detailed Insights)
- **Actions**: Progress viewing, streak management, trend analysis

### Settings / Profile
- **Level**: Stack under More
- **Depth**: 2-3 (More → Settings → Specific Setting)
- **Actions**: Preferences, notifications, account management

### Modal Screens
- **Level**: Overlay
- **Depth**: 0 (temporary overlay)
- **Actions**: Creation flows, quick actions, confirmations

## Interaction Principles

### Swipe to Go Back
- Standard gesture for navigation
- Works across all stack screens
- Haptic feedback on successful back
- Visual indication of swipe direction

### Swipe Actions on Lists
- Swipe right to complete (tasks, shopping)
- Swipe left to edit/delete
- Swipe actions reveal contextual options
- Haptic feedback on action completion

### Long-Press for Contextual Actions
- Long press on items for context menu
- Reveal secondary actions without UI clutter
- Haptic feedback on long press
- Visual feedback during press

### Pull-to-Refresh
- Standard gesture for data updates
- Loading indicator during refresh
- Haptic feedback on completion
- Smooth animation states

### Haptic Feedback
- Light feedback for taps and selections
- Medium feedback for actions and completions
- Heavy feedback for errors and confirmations
- Consistent patterns across interactions

### Safe-Area Padding
- Respect device notches and rounded corners
- Maintain thumb zone accessibility
- Adaptive padding for different devices
- Consistent spacing patterns

### Thumb-Reachable Action Placement
- Primary actions in bottom 25% of screen
- FAB in center bottom position
- Tab navigation in thumb zone
- Quick actions easily accessible

## Cognitive Load Considerations

### Low-Energy Usage
- Quick capture requires minimal energy
- One-handed operation reduces friction
- Predictive defaults minimize decisions
- Fast entry/exit for micro-tasks

### Rapid Task Switching
- Quick return to Today after actions
- Preserve context across navigation
- Minimal loading states and transitions
- Fast gesture-based interactions

### Micro-Interactions
- Small actions build momentum
- Immediate feedback on interactions
- Progress visualization for motivation
- Celebratory feedback for completions

### Minimal Decision Fatigue
- Smart defaults reduce choices
- Clear action hierarchy
- Predictable navigation patterns
- Consistent interaction models

### Predictable Return Paths
- Always know how to get back
- Consistent back button behavior
- Quick return to primary context
- Clear navigation breadcrumbs

## Accessibility Considerations

### Large Tap Targets
- Minimum 44px touch targets
- Increased spacing for accuracy
- Generous hit areas for small elements
- Clear visual feedback on touch

### Consistent Focus Order
- Logical tab navigation sequence
- Screen reader-friendly structure
- Keyboard navigation support
- Focus management for modals

### Screen Reader-Friendly Tab Labels
- Descriptive labels for all tabs
- State announcements for active tabs
- Badge notifications announced
- Context-aware labeling

### Reduced-Motion Options
- Respect user motion preferences
- Provide alternative animations
- Maintain functionality without motion
- Smooth transitions that don't distract

### High Contrast Support
- Maintain contrast ratios
- Clear visual hierarchy
- Accessible color combinations
- Text alternatives for visual elements

### Voice Control Support
- Voice commands for navigation
- Actionable elements properly labeled
- Consistent naming patterns
- Voice feedback for actions
