import { useMemo, useState } from "react";
import { ClipboardPlus, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router-dom";

import TodayHeader from "@/components/TodayHeader";
import TaskProgressCard from "@/features/tasks/components/TaskProgressCard";
import TaskCategoryCard from "@/features/tasks/components/TaskCategoryCard";

import MoneyLeftCard from "@/components/MoneyLeftCard";
import BillsDueCard from "@/features/bills/components/BillsDueCard";

import AddTask from "@/components/modal/AddTask";
import AddExpense from "@/components/modal/AddExpense";

import PageShell from "@/app/layout/PageShell";

import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { toDateString } from "@/shared/lib/date";
import { getBudgetSummary } from "@/features/budget/selectors/budgetSelectors";
import { useTaskActions } from "@/features/tasks/hooks/useTaskActions";
import { useTaskProgress } from "@/features/tasks/hooks/useTaskProgress";
import { useTaskInsights } from "@/features/tasks/hooks/useTaskInsights";
import ActionButton from "@/components/ActionButton";

const TodayPage = () => {
  const navigate = useNavigate();
  const { addTask } = useTaskActions();
  const addExpense = useBudgetStore((s) => s.addExpense);

  const expenses = useBudgetStore((s) => s.expenses);
  const weeklyBudget = useBudgetStore((s) => s.weeklyBudget);

  const [taskOpen, setTaskOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateString = toDateString(selectedDate);

  const progress = useTaskProgress(selectedDateString);
  const { summaries: categorySummary } = useTaskInsights(selectedDateString);

  const budget = useMemo(
    () => getBudgetSummary(expenses, weeklyBudget),
    [expenses, weeklyBudget]
  );

  return (
    <PageShell>
      <div className="space-y-4">
        {/* HEADER */}
        <TodayHeader
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        {/* HERO */}
        <TaskProgressCard
          percentage={progress.percentage}
          total={progress.total}
          completed={progress.completed}
        />

        {/* GROUPED CONTENT */}
        <div className="space-y-4">
          <TaskCategoryCard
            data={categorySummary}
            onViewAll={() => navigate("/tasks")}
          />

          <MoneyLeftCard
            remaining={Math.round(Math.max(0, budget.remaining))}
            spent={Math.round(budget.spent)}
          />

          <BillsDueCard />
        </div>

        {/* ACTIONS */}
        <div className="space-y-3 pt-4">
          <ActionButton variant="adjunct" fullWidth onClick={() => setTaskOpen(true)}>
            <ClipboardPlus size={20} strokeWidth={2} />
            <span>Add Task</span>
          </ActionButton>

          <ActionButton variant="recall" fullWidth onClick={() => setExpenseOpen(true)}>
            <PiggyBank size={20} strokeWidth={2} />
            <span>Add Expense</span>
          </ActionButton>
        </div>
      </div>

      {/* MODALS (OUTSIDE LAYOUT) */}
      <AddTask
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
    </PageShell>
  );
};

export default TodayPage;
