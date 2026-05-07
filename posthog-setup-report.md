<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of your project. This is a client-side React/Vite application that already had PostHog JS (posthog-js: ^1.372.9) installed and partially integrated with a comprehensive analytics system. The integration has been enhanced with error tracking, user identification, and additional event tracking in key user flows.

## Integration Summary

### Files Modified

1. **src/analytics/analyticsEvents.ts**
   - Added 'error' event category
   - Added ErrorBoundaryTriggeredEvent interface for error tracking
   - Added error event to AnalyticsEvent union type

2. **src/app/providers/ErrorBoundary.tsx**
   - Added PostHog error tracking in componentDidCatch
   - Tracks error_message, error_stack, component_stack, and error_name
   - Gracefully handles tracking failures

3. **src/features/onboarding/components/steps/CompletionStep.tsx**
   - Added user identification using PostHog's identify() function
   - Identifies users with onboarding data (name, focus areas, goals, modules, cadence, planning style)
   - Uses timestamp-based user ID for anonymous users

4. **src/features/tasks/store/useTasksStore.ts**
   - Added event tracking to addTask action
   - Added event tracking to toggleTask action (tracks completions only)
   - Added event tracking to deleteTask action
   - All tracking includes task properties (id, category, priority, completion status)

5. **src/components/home/HomeDashboardView.tsx**
   - Added dashboard view tracking on component mount
   - Tracks view type ('home'), pending tasks, completed tasks, and momentum score

6. **src/components/home/QuickActionsPanel.tsx**
   - Added quick action tracking for all action handlers
   - Tracks 'add_task', 'view_shopping', and 'start_routine' actions
   - Includes location context ('home')

## Events Instrumented

| Event Name | Event Description | File Location |
|------------|-------------------|---------------|
| onboarding:started | User starts the onboarding flow | src/features/onboarding/OnboardingScreen.tsx |
| onboarding:step_viewed | User views a specific onboarding step | src/features/onboarding/components/steps/GoalsStep.tsx |
| onboarding:step_completed | User completes an onboarding step | src/features/onboarding/components/steps/GoalsStep.tsx |
| onboarding:completed | User completes the entire onboarding flow | src/features/onboarding/components/steps/CompletionStep.tsx |
| routine:created | User creates a new routine | src/features/routines/components/RoutineCreator.tsx |
| routine:started | User starts executing a routine | src/features/routines/components/RoutineExecutor.tsx |
| routine:completed | User completes a routine execution | src/features/routines/components/RoutineExecutor.tsx |
| momentum:viewed | User views their momentum score | src/features/momentum/components/MomentumRing.tsx |
| momentum:score_changed | User's momentum score changes | src/features/momentum/hooks/useMomentumToday.ts |
| dashboard:viewed | User views a dashboard section | src/components/home/HomeDashboardView.tsx |
| dashboard:quick_action_used | User uses a quick action from dashboard | src/components/home/QuickActionsPanel.tsx |
| task:created | User creates a new task | src/features/tasks/store/useTasksStore.ts |
| task:completed | User completes a task | src/features/tasks/store/useTasksStore.ts |
| task:deleted | User deletes a task | src/features/tasks/store/useTasksStore.ts |
| error:boundary_triggered | React ErrorBoundary catches an error | src/app/providers/ErrorBoundary.tsx |

## Key Features

### Error Tracking
- Automatic error tracking via React ErrorBoundary
- Captures error details including stack traces
- Graceful degradation if tracking fails

### User Identification
- Automatic user identification on onboarding completion
- Captures user preferences and onboarding selections
- Enables cross-session user behavior analysis

### Task Analytics
- Complete task lifecycle tracking (create, complete, delete)
- Captures task metadata (category, priority, due date)
- Enables funnel analysis for task completion rates

### Dashboard Analytics
- Dashboard view tracking for engagement analysis
- Quick action tracking for feature usage
- Location context for action attribution

## Architecture Notes

This project uses a sophisticated client-side analytics architecture:
- Type-safe event definitions in `analyticsEvents.ts`
- React hooks for analytics in `analyticsHooks.ts`
- Tracker implementation in `eventTracker.ts`
- PostHog JS initialization in `main.tsx`
- Environment variables for PostHog configuration (.env.example)

The integration follows the existing patterns and does not alter the fundamental architecture. All additions are minimal and targeted, maintaining the project's code quality and type safety.

## Next Steps

The PostHog MCP tool was not available to create a dashboard automatically. To complete the setup:

1. **Configure PostHog Environment Variables**
   - Update `.env` with your PostHog API key and host
   - Reference `.env.example` for required variables

2. **Create Dashboard in PostHog**
   - Navigate to your PostHog dashboard
   - Create a new dashboard named "Analytics basics"
   - Add insights based on the instrumented events:
     - Onboarding completion funnel
     - Task creation and completion rates
     - Dashboard engagement metrics
     - Error rate monitoring
     - Quick action usage patterns

3. **Monitor Events**
   - Verify events are appearing in PostHog
   - Check event properties are correctly populated
   - Validate user identification is working

### Agent Skill

We've left an agent skill folder in your project at `.posthog/skills/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
