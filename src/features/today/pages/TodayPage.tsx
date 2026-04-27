import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardPlus, PiggyBank } from "lucide-react";

import PageShell from "@/app/layout/PageShell";
import TodayHeader from "@/components/TodayHeader";
<<<<<<< Updated upstream
import ActionButton from "@/components/ActionButton";
=======
import TodayHeroCard from "@/features/today/components/TodayHeroCard";
import TodaySummaryRow from "@/features/today/components/TodaySummaryRow";

import { useBillViews } from "@/features/bills/selectors/billsSelectors";

>>>>>>> Stashed changes
import AddTask from "@/components/modal/AddTask";
import AddExpense from "@/components/modal/AddExpense";

import TodayHeroCard from "@/features/today/components/TodayHeroCard";
import TodaySummaryCard from "@/features/today/components/TodaySummaryCard";

import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useBillViews } from "@/features/bills/selectors/billsSelectors";
import { useBudgetSummary } from "@/features/budget/selectors/budgetSelectors";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";

import { toDateString } from "@/shared/lib/date";
import { useState } from "react";

const TodayPage = () => {
  const navigate = useNavigate();
  const addExpense = useBudgetStore((s) => s.addExpense);

  const [taskOpen, setTaskOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateString = useMemo(
    () => toDateString(selectedDate),
    [selectedDate],
  );

  // Single, memoized subscription for everything tasks-related on this page.
  const { progress, insights, actions } = useTasks(selectedDateString);

  const budget = useBudgetSummary();
  const billViews = useBillViews();

<<<<<<< Updated upstream
  const remainingRounded = useMemo(
    () => Math.round(Math.max(0, budget.remaining)),
    [budget.remaining],
  );

  return (
    <PageShell>
      <div className="space-y-6">
=======
  /**
   * HANDLERS
   */
  const handleAddTask = () => {
    setTaskOpen(true);
  };

  const handleAddExpense = () => {
    setExpenseOpen(true);
  };

  return (
    <PageShell>
      <div className="space-y-4">
        {/* HEADER */}
>>>>>>> Stashed changes
        <TodayHeader
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />

<<<<<<< Updated upstream
=======
        {/* HERO (PRIMARY) */}
>>>>>>> Stashed changes
        <TodayHeroCard
          percentage={progress.percentage}
          total={progress.total}
          completed={progress.completed}
          categories={insights.summaries}
          onAddTask={() => setTaskOpen(true)}
          onViewAll={() => navigate("/tasks")}
        />

<<<<<<< Updated upstream
        <TodaySummaryCard
          remaining={remainingRounded}
          billsDueCount={billViews.length}
        />
=======
        {/* SUMMARY (LIGHTWEIGHT ROW) */}
        <div className="pt-1">
          <TodaySummaryRow
            remaining={Math.round(Math.max(0, budget.remaining))}
            billsDueCount={billViews.length}
          />
        </div>
>>>>>>> Stashed changes

        <div className="space-y-3 pt-2">
          <ActionButton variant="primary" fullWidth onClick={() => setTaskOpen(true)}>
            <ClipboardPlus size={20} strokeWidth={2} />
            <span>Add Task</span>
          </ActionButton>

          <ActionButton variant="secondary" fullWidth onClick={() => setExpenseOpen(true)}>
            <PiggyBank size={20} strokeWidth={2} />
            <span>Add Expense</span>
          </ActionButton>
        </div>
      </div>

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
    </PageShell>
  );
};

export default TodayPage;
