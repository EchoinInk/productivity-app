import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import Header from "@/components/layout/Header";
import TodayHeroCard from "@/features/today/components/TodayHeroCard";
import TodaySummaryRow from "@/features/today/components/TodaySummaryRow";
import TodayQuickActionsGrid from "@/features/today/components/TodayQuickActionsGrid";

import { useBillViews } from "@/features/bills/selectors/billsSelectors";
import AddTask from "@/features/tasks/components/AddTaskModal";
import AddExpense from "@/features/budget/components/AddExpenseModal";

import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useBudgetSummary, selectAddExpense } from "@/features/budget/selectors/budgetSelectors";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";

import { toDateString } from "@/shared/lib/date";

const TodayPage = () => {
  const navigate = useNavigate();
  const addExpense = useBudgetStore(selectAddExpense);

  const [taskOpen, setTaskOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateString = useMemo(
    () => toDateString(selectedDate),
    [selectedDate],
  );

  const { progress, insights, sections, actions } = useTasks(selectedDateString);
  const budget = useBudgetSummary();
  const billViews = useBillViews();

  // ✅ derive today's tasks count from sections
  const todaySection = useMemo(
    () => sections.find((s) => s.type === "today"),
    [sections]
  );

  const tasksCount = todaySection?.total ?? 0;

  // 🔧 TEMP placeholders (replace when you wire features)
  const mealsCount = 2;
  const shoppingCount = 6;

  return (
    <>
      <div className="space-y-6 pb-24">
        {/* Header */}
        <Header
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          showDatePill
          showTopBar
        />

        {/* Hero */}
        <TodayHeroCard
          percentage={progress.percentage}
          total={progress.total}
          completed={progress.completed}
          categories={insights.summaries}
          onAddTask={() => setTaskOpen(true)}
          onViewAll={() => navigate("/tasks")}
        />

        {/* ORIGINAL SUMMARY ROW (kept) */}
        <TodaySummaryRow
          remaining={Math.round(Math.max(0, budget.remaining))}
          billsDueCount={billViews.length}
        />

        {/* 🆕 GRID (your screenshot layout) */}
        <TodayQuickActionsGrid
          tasks={tasksCount}
          meals={mealsCount}
          shopping={shoppingCount}
          remaining={Math.round(Math.max(0, budget.remaining))}
        />
      </div>

      {/* FAB */}
      <button
        onClick={() => setTaskOpen(true)}
        className="fixed bottom-20 right-5 h-14 w-14 rounded-full shadow-lg flex items-center justify-center"
        style={{
          background:
            "linear-gradient(90deg, #a4f0e8, #c0d3f0, #c7c9f4, #ddc9eb, #f7d0d0)",
        }}
      >
        <Plus className="text-white" />
      </button>

      {/* Modals */}
      <AddTask
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