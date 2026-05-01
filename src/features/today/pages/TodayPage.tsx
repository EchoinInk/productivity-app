import { useState } from "react";

import Header from "@/components/layout/Header";
import { TodayHeroCard } from "@/features/today/components/TodayHeroCard";
import TodayQuickActionsGrid from "@/features/today/components/TodayQuickActionsGrid";
import { UpNextList } from "@/features/today/components/TodayUpNextList";

import { AddTaskModal } from "@/features/tasks";
import AddExpense from "@/features/budget/components/AddExpenseModal";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useTodayData } from "@/features/today/hooks/useTodayData";
import { getToday } from "@/shared/lib/date";

const greetingFor = (d: Date): string => {
  const h = d.getHours();
  if (h < 12) return "Good morning 👋";
  if (h < 18) return "Good afternoon 👋";
  return "Good evening 👋";
};

const TodayPage = () => {
  const addExpense = useBudgetStore((state) => state.addExpense);
  const addTask = useTasksStore((state) => state.addTask);
  const toggleTask = useTasksStore((state) => state.toggleTask);
  
  const [taskOpen, setTaskOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [selectedDate] = useState(new Date());

  const today = useTodayData();
  const selectedDateString = getToday();
  const greeting = greetingFor(selectedDate);
  const { sections } = useTasks(selectedDateString);
  const todaySection = sections.find((s) => s.type === "today");

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
        <div className="relative z-10 w-full max-w-[430px] mx-auto px-4 pt-4 pb-[calc(96px+env(safe-area-inset-bottom))] space-y-8">

          <Header
            showTopBar
            greeting={greeting}
            topBarSubtitle="Let's make today amazing"
            hasNotifications={false}
          />

          {/* HERO */}
          <div className="animate-[fadeIn_0.45s_ease-out]">
            <TodayHeroCard
              percentage={today.focus.percentage}
              total={today.summary.tasks.total}
              completed={today.summary.tasks.completed}
              onAddTask={() => setTaskOpen(true)}
            />
          </div>

          {/* QUICK ACTIONS */}
          <div className="animate-[fadeIn_0.65s_ease-out]">
            <TodayQuickActionsGrid
              tasks={today.summary.tasks.total}
              meals={today.summary.meals.logged}
              shopping={today.summary.shopping.remaining}
              remaining={today.summary.budget.remaining}
            />
          </div>

          {/* UP NEXT */}
          <div className="animate-[fadeIn_0.85s_ease-out]">
            <UpNextList
              tasks={todaySection?.tasks || []}
              today={selectedDateString}
              onToggle={toggleTask}
            />
          </div>

        </div>
      </div>

      {/* MODALS */}
      <AddTaskModal
        open={taskOpen}
        onClose={() => setTaskOpen(false)}
        defaultDate={selectedDateString}
        onSave={addTask}
      />

      <AddExpense
        open={expenseOpen}
        onClose={() => setExpenseOpen(false)}
        onSave={addExpense}
      />
    </>
  );
};

export default TodayPage;
