import { useMemo, useState } from "react";

import Header from "@/components/layout/Header";
import { TodayHeroCard } from "@/features/today/components/TodayHeroCard";
import TodayQuickActionsGrid from "@/features/today/components/TodayQuickActionsGrid";
import { UpNextList } from "@/features/today/components/UpNextList";

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

  // 🔧 TEMP placeholders (replace when you wire features)
  const mealsCount = 2;
  const shoppingCount = 6;

  return (
    <>
      <div className="space-y-6 pb-24">
        <Header showTopBar />

        <TodayHeroCard
          percentage={progress.percentage}
          total={progress.total}
          completed={progress.completed}
          onAddTask={() => setTaskOpen(true)}
        />

        <TodayQuickActionsGrid
          tasks={tasksCount}
          meals={mealsCount}
          shopping={shoppingCount}
          remaining={Math.round(Math.max(0, budget.remaining))}
        />

        <UpNextList
          tasks={todayTasks}
          today={selectedDateString}
          onToggle={actions.toggleTask}
        />
      </div>

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
