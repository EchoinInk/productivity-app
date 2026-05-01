import { useState, useMemo, lazy, Suspense } from "react";
import Header from "@/components/layout/Header";
import { TodayHeroContainer } from "@/features/today/components/TodayHero/TodayHero.container";
import { TodaySummaryContainer } from "@/features/today/components/TodaySummary/TodaySummary.container";
import { AddTaskModal } from "@/features/tasks";
import AddExpense from "@/features/budget/components/AddExpenseModal";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";

// Lazy load heavy components for mobile performance
const TodayUpNextContainer = lazy(() => import("@/features/today/components/TodayUpNext/TodayUpNext.container").then(module => ({ default: module.TodayUpNextContainer })));
const ActivityListContainer = lazy(() => import("@/features/today/components/ActivityList/ActivityList.container").then(module => ({ default: module.ActivityListContainer })));
const QuickActionsBarContainer = lazy(() => import("@/features/today/components/QuickActionsBar/QuickActionsBar.container").then(module => ({ default: module.QuickActionsBarContainer })));
const InsightsCardContainer = lazy(() => import("@/features/insights/components/InsightsCard.container").then(module => ({ default: module.InsightsCardContainer })));

const greetingFor = (d: Date): string => {
  const h = d.getHours();
  if (h < 12) return "Good morning 👋";
  if (h < 18) return "Good afternoon 👋";
  return "Good evening 👋";
};

const HomeScreen = () => {
  const addExpense = useBudgetStore((state) => state.addExpense);
  
  const [taskOpen, setTaskOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [selectedDate] = useState(new Date());

  // Optimize greeting computation - move outside of render path
  const greeting = useMemo(() => greetingFor(selectedDate), [selectedDate]);

  const handleAddTask = () => setTaskOpen(true);
  const handleAddExpense = () => setExpenseOpen(true);

  return (
    <>
      {/* PAGE WRAPPER */}
      <div className="relative min-h-screen bg-background overflow-hidden">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="
              absolute
              top-[-40px]
              left-1/2 -translate-x-1/2
              w-[320px] h-[320px]
              blur-2xl
              opacity-15
              bg-gradient-hero
            "
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[430px] mx-auto px-4 pt-4 pb-[calc(96px+env(safe-area-inset-bottom))] space-y-6">

          <Header
            showTopBar
            greeting={greeting}
            topBarSubtitle="Let's make today amazing"
            hasNotifications={false}
          />

          {/* HERO - Focus Card */}
          <div className="animate-[fadeIn_0.45s_ease-out]">
            <TodayHeroContainer onAddTask={handleAddTask} />
          </div>

          {/* SUMMARY CARDS */}
          <div className="animate-[fadeIn_0.55s_ease-out]">
            <TodaySummaryContainer />
          </div>

          {/* LAZY-LOADED SECTIONS - Below the fold for mobile performance */}
          <Suspense fallback={<div className="h-20 animate-pulse bg-muted/20 rounded-lg" />}>
            {/* UP NEXT */}
            <div className="animate-[fadeIn_0.65s_ease-out]">
              <TodayUpNextContainer />
            </div>
          </Suspense>

          <Suspense fallback={<div className="h-32 animate-pulse bg-muted/20 rounded-lg" />}>
            {/* RECENT ACTIVITY */}
            <div className="animate-[fadeIn_0.75s_ease-out]">
              <ActivityListContainer />
            </div>
          </Suspense>

          <Suspense fallback={<div className="h-24 animate-pulse bg-muted/20 rounded-lg" />}>
            {/* INSIGHTS */}
            <div className="animate-[fadeIn_0.80s_ease-out]">
              <InsightsCardContainer />
            </div>
          </Suspense>

          <Suspense fallback={<div className="h-16 animate-pulse bg-muted/20 rounded-lg" />}>
            {/* QUICK ACTIONS */}
            <div className="animate-[fadeIn_0.85s_ease-out]">
              <QuickActionsBarContainer
                onAddTask={handleAddTask}
                onAddExpense={handleAddExpense}
              />
            </div>
          </Suspense>

        </div>
      </div>

      {/* MODALS */}
      <AddTaskModal
        open={taskOpen}
        onClose={() => setTaskOpen(false)}
        defaultDate={selectedDate.toISOString().split('T')[0] || ''}
        onSave={() => {}}
      />

      <AddExpense
        open={expenseOpen}
        onClose={() => setExpenseOpen(false)}
        onSave={addExpense}
      />
    </>
  );
};

export default HomeScreen;
