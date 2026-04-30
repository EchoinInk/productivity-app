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
      {/* 🔥 PAGE WRAPPER (proper depth + background) */}
      <div className="relative min-h-screen bg-[#f7f8fb] overflow-hidden">

        {/* 🌈 Radial glow (background layer) */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[520px] h-[520px] blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(164,240,232,0.35) 0%, rgba(192,211,240,0.25) 40%, transparent 70%)",
            }}
          />
        </div>

        {/* 📱 CONTENT */}
        <div className="relative z-10 px-4 pt-4 pb-24 space-y-8">

          <Header showTopBar />

          {/* HERO */}
          <div className="animate-[fadeIn_0.5s_ease-out]">
            <TodayHeroCard
              percentage={progress.percentage}
              total={progress.total}
              completed={progress.completed}
              onAddTask={() => setTaskOpen(true)}
            />
          </div>

          {/* QUICK ACTIONS */}
          <div className="animate-[fadeIn_0.7s_ease-out]">
            <TodayQuickActionsGrid
              tasks={tasksCount}
              meals={mealsCount}
              shopping={shoppingCount}
              remaining={Math.round(Math.max(0, budget.remaining))}
            />
          </div>

          {/* UP NEXT */}
          <div className="mt-2 animate-[fadeIn_0.9s_ease-out]">
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