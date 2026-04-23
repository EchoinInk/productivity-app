import { useMemo, useState } from "react";
import { ClipboardPlus, PiggyBank } from "lucide-react";

import TodayHeader from "@/components/TodayHeader";
import TodayTasks from "@/features/tasks/components/TodayTasks";
import TaskProgressCard from "@/features/tasks/components/TaskProgressCard";

import MoneyLeftCard from "@/components/MoneyLeftCard";
import BillsDueCard from "@/features/bills/components/BillsDueCard";

import AddButton from "@/components/AddButton";
import AddTask from "@/components/modal/AddTask";
import AddExpense from "@/components/modal/AddExpense";

import PageShell from "@/app/layout/PageShell";

import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { useBudgetStore } from "@/features/budget/store/useBudgetStore";
import { toDateString } from "@/shared/lib/date";
import { getBudgetSummary } from "@/features/budget/selectors/budgetSelectors";
import { useTasksView } from "@/features/tasks/hooks/useTasksView";

const TodayPage = () => {
  const addTask = useTasksStore((s) => s.addTask);
  const addExpense = useBudgetStore((s) => s.addExpense);

  const expenses = useBudgetStore((s) => s.expenses);
  const weeklyBudget = useBudgetStore((s) => s.weeklyBudget);

  const [taskOpen, setTaskOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateString = toDateString(selectedDate);

  const { timeline, progress, toggleTask } = useTasksView(selectedDateString);

  const budget = useMemo(
    () => getBudgetSummary(expenses, weeklyBudget),
    [expenses, weeklyBudget]
  );

  return (
    <PageShell>
      {/* 🔥 CONTROL RHYTHM HERE */}
      <div className="space-y-4">
        <TodayHeader
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        <TaskProgressCard
          percentage={progress.percentage}
          total={progress.total}
          completed={progress.completed}
        />

        <TodayTasks
          timeline={timeline}
          onToggleTask={toggleTask}
          activeDate={selectedDateString}
        />

        <MoneyLeftCard
          remaining={Math.round(Math.max(0, budget.remaining))}
          spent={Math.round(budget.spent)}
          total={weeklyBudget}
        />

        <BillsDueCard />

        {/* 🔧 FIXED BUTTON SECTION */}
        <div className="grid grid-cols-2 gap-2">
          <AddButton variant="adjunct" onClick={() => setTaskOpen(true)}>
            <ClipboardPlus size={20} strokeWidth={2} />
            <span>Add Task</span>
          </AddButton>

          <AddButton variant="recall" onClick={() => setExpenseOpen(true)}>
            <PiggyBank size={20} strokeWidth={2} />
            <span>Add Expense</span>
          </AddButton>
        </div>
      </div>

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