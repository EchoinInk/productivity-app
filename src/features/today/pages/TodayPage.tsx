import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardPlus, PiggyBank } from "lucide-react";

import ActionButton from "@/components/ActionButton";
import Header from "@/components/Header";
import TodayHeroCard from "@/features/today/components/TodayHeroCard";
import TodaySummaryRow from "@/features/today/components/TodaySummaryRow";

import { useBillViews } from "@/features/bills/selectors/billsSelectors";
import AddTask from "@/components/modal/AddTask";
import AddExpense from "@/components/modal/AddExpense";

import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useBudgetSummary } from "@/features/budget/selectors/budgetSelectors";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";

import { toDateString } from "@/shared/lib/date";

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

  return (
    <>
      <div className="space-y-4">
        <Header
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          showDatePill={true}
          showTopBar={true}
        />

        <TodayHeroCard
          percentage={progress.percentage}
          total={progress.total}
          completed={progress.completed}
          categories={insights.summaries}
          onAddTask={() => setTaskOpen(true)}
          onViewAll={() => navigate("/tasks")}
        />

        <div className="pt-1">
          <TodaySummaryRow
            remaining={Math.round(Math.max(0, budget.remaining))}
            billsDueCount={billViews.length}
          />
        </div>

        <div className="space-y-3 pt-2">
          <ActionButton
            variant="primary"
            fullWidth
            onClick={() => setTaskOpen(true)}
          >
            <ClipboardPlus size={20} strokeWidth={2} />
            <span>Add Task</span>
          </ActionButton>

          <ActionButton
            variant="secondary"
            fullWidth
            onClick={() => setExpenseOpen(true)}
          >
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
    </>
  );
};

export default TodayPage;
