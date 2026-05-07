import { memo, useCallback } from "react";
import type { HomeDashboardData } from "@/features/home/hooks/useHomeDashboard";
import type { HomeModalsReturn } from "@/features/home/hooks/useHomeModals";
import { TodayCommandCenter } from "./TodayCommandCenter";
import { UpNextPriority } from "./UpNextPriority";
import { UtilityActions } from "./UtilityActions";
import { InsightsPanel } from "./InsightsPanel";
import { QuickCaptureBar } from "./QuickCaptureBar";

export interface HomeDashboardViewProps {
  data: HomeDashboardData;
  modals: HomeModalsReturn;
}

/**
 * Home Dashboard View — Mobile-First Productivity OS
 *
 * Optimized for one-handed use and thumb ergonomics:
 * 1. Primary actions anchored in thumb zone (QuickCaptureBar)
 * 2. High-frequency interactions at bottom of screen
 * 3. Large touch targets (44px minimum)
 * 4. Reduced vertical stacking fatigue
 * 5. Sticky action regions for quick access
 *
 * Layout:
 * - Mobile: Stacked with sticky bottom action tray
 * - Tablet+: 2-column grid with floating actions
 *
 * Ergonomic principles:
 * - Thumb zone: 60% of screen height from bottom
 * - Natural hand position: right thumb, phone held in right hand
 * - Quick capture: 3 taps max to add any item
 */
export const HomeDashboardView = memo(({ data, modals }: HomeDashboardViewProps) => {
  const { nextTask, todayData, toggleTask } = data;
  const { openTaskModal, openMealModal, openExpenseModal } = modals;

  // Memoize callbacks to prevent child re-renders
  const handleToggleNextTask = useCallback(() => {
    if (nextTask) {
      toggleTask(nextTask.id);
    }
  }, [nextTask, toggleTask]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-200px)]">
      {/* SCROLLABLE CONTENT AREA */}
      <div className="flex-1 space-y-3 pb-4">
        {/* ROW 1: Command Center + Utility Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TodayCommandCenter
            percentage={todayData.focus.percentage}
            total={todayData.summary.tasks.total}
            completed={todayData.summary.tasks.completed}
            remaining={todayData.summary.tasks.total - todayData.summary.tasks.completed}
            onAddTask={openTaskModal}
          />
          <UtilityActions
            tasks={todayData.summary.tasks.total}
            meals={todayData.summary.meals.logged}
            remaining={todayData.summary.budget.remaining}
            onAddTask={openTaskModal}
            onAddMeal={openMealModal}
            onAddExpense={openExpenseModal}
          />
        </div>

        {/* ROW 2: Up Next Priority */}
        <section aria-label="Next task" className="px-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Up Next
            </span>
            {nextTask && (
              <span className="text-xs text-text-muted">
                Tap to complete
              </span>
            )}
          </div>
          <UpNextPriority
            task={nextTask}
            onPress={handleToggleNextTask}
          />
        </section>

        {/* ROW 3: Insights */}
        <section aria-label="Insights" className="px-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              Insights
            </span>
          </div>
          <InsightsPanel />
        </section>

        {/* SPACER for bottom action tray */}
        <div className="h-24 sm:h-0" />
      </div>

      {/* STICKY QUICK CAPTURE BAR - Thumb Zone Optimized */}
      <div className="sm:hidden">
        <QuickCaptureBar
          onAddTask={openTaskModal}
          onAddMeal={openMealModal}
          onAddExpense={openExpenseModal}
        />
      </div>
    </div>
  );
});

HomeDashboardView.displayName = 'HomeDashboardView';
