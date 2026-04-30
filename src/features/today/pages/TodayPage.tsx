import { useMemo, useState } from "react";

import Header from "@/components/layout/Header";
import { TodayHeroCard } from "@/features/today/components/TodayHeroCard";
import TodayQuickActionsGrid from "@/features/today/components/TodayQuickActionsGrid";
import { UpNextList } from "@/features/today/components/TodayUpNextList";

import { AddTaskModal } from "@/features/tasks";
import AddExpense from "@/features/budget/components/AddExpenseModal";

import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useBudgetSummary } from "@/features/budget/hooks/useBudget";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";

import { toDateString } from "@/shared/lib/date";

const TodayPage = () => {
  const addExpense = useBudgetStore((state) => state.addExpense);

  const [taskOpen, setTaskOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [selectedDate] = useState(new Date());

  const selectedDateString = useMemo(
    () => toDateString(selectedDate),
    [selectedDate],
  );

  const { progress, sections, actions } = useTasks(selectedDateString);
  const budget = useBudgetSummary();

  const todaySection = useMemo(
    () => sections.find((s) => s.type === "today"),
    [sections],
  );

  const tasksCount = todaySection?.total ?? 0;
  const todayTasks = todaySection?.tasks ?? [];

  // TEMP placeholders
  const mealsCount = 2;
  const shoppingCount = 6;

  return (
    <>
      {/* PAGE WRAPPER */}
      <div className="relative min-h-screen bg-white overflow-hidden">

        {/* 🔥 SUBTLE BACKGROUND GLOW (refined) */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="
              absolute 
              top-[-40px] 
              left-1/2 -translate-x-1/2 
              w-[320px] h-[320px] 
              blur-2xl 
              opacity-15
            "
            style={{
              background:
                "radial-gradient(circle, rgba(164,240,232,0.18) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* 📱 CONTENT */}
        <div className="relative z-10 w-full max-w-[430px] mx-auto px-4 pt-4 pb-[calc(96px+env(safe-area-inset-bottom))] space-y-8">

          <Header showTopBar />

          {/* HERO */}
          <div className="animate-[fadeIn_0.45s_ease-out]">
            <TodayHeroCard
              percentage={progress.percentage}
              total={progress.total}
              completed={progress.completed}
              onAddTask={() => setTaskOpen(true)}
            />
          </div>

          {/* QUICK ACTIONS */}
          <div className="animate-[fadeIn_0.65s_ease-out]">
            <TodayQuickActionsGrid
              tasks={tasksCount}
              meals={mealsCount}
              shopping={shoppingCount}
              remaining={Math.round(Math.max(0, budget.remaining))}
            />
          </div>

          {/* UP NEXT */}
          <div className="animate-[fadeIn_0.85s_ease-out]">
            <UpNextList
              tasks={todayTasks}
              today={selectedDateString}
              onToggle={actions.toggleTask}
            />
          </div>

        </div>
      </div>

      {/* MODALS */}
      <AddTaskModal
        open={taskOpen}
        onClose={() => setTaskOpen(false)}
        defaultDate={selectedDateString}
        onSave={actions.addTask}
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