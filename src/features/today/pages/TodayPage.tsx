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
import { toDateString, getToday } from "@/shared/lib/date";
import { getBudgetSummary } from "@/features/budget/selectors/budgetSelectors";
import { useTaskActions } from "@/features/tasks/hooks/useTaskActions";
import { useTaskProgress } from "@/features/tasks/hooks/useTaskProgress";
import { useTaskInsights } from "@/features/tasks/hooks/useTaskInsights";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { selectTasks } from "@/features/tasks/selectors/taskSelectors";
import { useBillViews } from "@/features/bills/selectors/billsSelectors";
import { CheckboxRow } from "@/components/ui/CheckboxRow";
import { isTaskCompleted } from "@/features/tasks/api";
import ActionButton from "@/components/ActionButton";

import type { Task } from "@/features/tasks/types";
import type { BillView } from "@/features/bills/selectors/billsSelectors";

// Time-aware helper functions
const getOverdueTasks = (tasks: Task[], today: string): Task[] => {
  return tasks.filter(task => task.date < today && !task.completedDates.includes(today));
};

const getTasksDueToday = (tasks: Task[], today: string): Task[] => {
  return tasks.filter(task => task.date === today);
};

const getUrgentBills = (bills: BillView[], today: string): BillView[] => {
  return bills.filter(bill => bill.amount === "Due Today" || bill.amount.includes("$"));
};

const TodayPage = () => {
  const navigate = useNavigate();
  const { addTask, toggleTask } = useTaskActions();
  const addExpense = useBudgetStore((s) => s.addExpense);

  const expenses = useBudgetStore((s) => s.expenses);
  const weeklyBudget = useBudgetStore((s) => s.weeklyBudget);

  const [taskOpen, setTaskOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateString = toDateString(selectedDate);
  const today = getToday();

  const allTasks = useTasksStore(selectTasks);
  const billViews = useBillViews();

  const overdueTasks = useMemo(() => getOverdueTasks(allTasks, today), [allTasks, today]);
  const tasksDueToday = useMemo(() => getTasksDueToday(allTasks, today), [allTasks, today]);
  const urgentBills = useMemo(() => getUrgentBills(billViews, today), [billViews, today]);

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

        {/* URGENT ITEMS - Overdue Tasks */}
        {overdueTasks.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-destructive">Overdue Tasks</h2>
            <div className="space-y-2">
              {overdueTasks.map((task) => (
                <CheckboxRow
                  key={task.id}
                  checked={isTaskCompleted(task, task.date)}
                  onToggle={() => toggleTask(task.id, task.date)}
                  onClick={() => {}}
                >
                  {task.label}
                </CheckboxRow>
              ))}
            </div>
          </div>
        )}

        {/* URGENT ITEMS - Urgent Bills */}
        {urgentBills.length > 0 && (
          <BillsDueCard />
        )}

        {/* TODAY'S TASKS */}
        {tasksDueToday.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Tasks Due Today</h2>
            <div className="space-y-2">
              {tasksDueToday.map((task) => (
                <CheckboxRow
                  key={task.id}
                  checked={isTaskCompleted(task, today)}
                  onToggle={() => toggleTask(task.id, today)}
                  onClick={() => {}}
                >
                  {task.label}
                </CheckboxRow>
              ))}
            </div>
          </div>
        )}

        {/* NEXT ACTIONS */}
        <div className="space-y-4">
          <TaskCategoryCard
            data={categorySummary}
            onViewAll={() => navigate("/tasks")}
          />

          <TaskProgressCard
            percentage={progress.percentage}
            total={progress.total}
            completed={progress.completed}
          />
        </div>

        {/* EVERYTHING ELSE */}
        <div className="space-y-4">
          <MoneyLeftCard
            remaining={Math.round(Math.max(0, budget.remaining))}
            spent={Math.round(budget.spent)}
          />
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
