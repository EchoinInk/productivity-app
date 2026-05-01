import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import { TodayHeroContainer } from "@/features/today/components/TodayHero/TodayHero.container";
import { TodaySummaryContainer } from "@/features/today/components/TodaySummary/TodaySummary.container";
import { TodayUpNextContainer } from "@/features/today/components/TodayUpNext/TodayUpNext.container";
import { ActivityListContainer } from "@/features/today/components/ActivityList/ActivityList.container";
import { QuickActionsBarContainer } from "@/features/today/components/QuickActionsBar/QuickActionsBar.container";
import { InsightsCardContainer } from "@/features/insights/components/InsightsCard.container";
import { AddTaskModal } from "@/features/tasks";
import AddExpense from "@/features/budget/components/AddExpenseModal";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";

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

          {/* UP NEXT */}
          <div className="animate-[fadeIn_0.65s_ease-out]">
            <TodayUpNextContainer />
          </div>

          {/* RECENT ACTIVITY */}
          <div className="animate-[fadeIn_0.75s_ease-out]">
            <ActivityListContainer />
          </div>

          {/* INSIGHTS */}
          <div className="animate-[fadeIn_0.80s_ease-out]">
            <InsightsCardContainer />
          </div>

          {/* QUICK ACTIONS */}
          <div className="animate-[fadeIn_0.85s_ease-out]">
            <QuickActionsBarContainer
              onAddTask={handleAddTask}
              onAddExpense={handleAddExpense}
            />
          </div>

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
