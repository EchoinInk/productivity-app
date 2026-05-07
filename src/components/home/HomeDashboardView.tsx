import { memo, useCallback } from "react";
import type { HomeDashboardData } from "@/features/home/hooks/useHomeDashboard";
import type { HomeModalsReturn } from "@/features/home/hooks/useHomeModals";
import { TodayFocusSection } from "./TodayFocusSection";
import { UpNextSection } from "./UpNextSection";
import { QuickActionsPanel } from "./QuickActionsPanel";
import { InsightsPanel } from "./InsightsPanel";

export interface HomeDashboardViewProps {
  data: HomeDashboardData;
  modals: HomeModalsReturn;
}

/**
 * Home Dashboard View
 * 
 * Pure UI component that renders the home dashboard.
 * Receives all data and actions as props, making it:
 * - Testable (can pass mock data)
 * - Stateless (no direct store subscriptions)
 * - Focused on presentation only
 * 
 * Performance optimizations:
 * - Memoized to prevent unnecessary re-renders
 * - Memoized callbacks to prevent child re-renders
 */
export const HomeDashboardView = memo(({ data, modals }: HomeDashboardViewProps) => {
  const { nextTask, todayData, toggleTask } = data;
  const { openTaskModal, openMealModal, openExpenseModal } = modals;

  // Memoize callback to prevent UpNextSection from re-rendering when parent re-renders
  const handleToggleNextTask = useCallback(() => {
    if (nextTask) {
      toggleTask(nextTask.id);
    }
  }, [nextTask, toggleTask]);

  return (
    <div className="space-y-4">
      {/* HERO */}
      <TodayFocusSection
        percentage={todayData.focus.percentage}
        total={todayData.summary.tasks.total}
        completed={todayData.summary.tasks.completed}
        onAddTask={openTaskModal}
      />

      {/* UP NEXT */}
      <UpNextSection
        task={nextTask}
        onPress={handleToggleNextTask}
      />

      {/* QUICK ACTIONS */}
      <QuickActionsPanel
        tasks={todayData.summary.tasks.total}
        meals={todayData.summary.meals.logged}
        remaining={todayData.summary.budget.remaining}
        onAddTask={openTaskModal}
        onAddMeal={openMealModal}
        onAddExpense={openExpenseModal}
      />

      {/* INSIGHTS */}
      <InsightsPanel />
    </div>
  );
});

HomeDashboardView.displayName = 'HomeDashboardView';
