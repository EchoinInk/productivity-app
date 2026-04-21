import { useMemo, useState } from "react";
import { ClipboardPlus, PiggyBank } from "lucide-react";
import TodayHeader from "@/components/TodayHeader";
import TodayTasks from "@/components/TodayTasks";
import MoneyLeftCard from "@/components/MoneyLeftCard";
import BillsDueCard from "@/components/BillsDueCard";
import AddButton from "@/components/AddButton";
import TaskProgressCard from "@/components/TaskProgressCard";
import AddTask from "@/components/modal/AddTask";
import AddExpense from "@/components/modal/AddExpense";
import PageShell from "@/app/layout/PageShell";
import { useAppStore } from "@/store/useAppStore";
import { toDateString } from "@/shared/lib/date";
import { getBudgetSummary } from "@/features/budget/selectors/budgetSelectors";

const TodayPage = () => {
  const addTask = useAppStore((s) => s.addTask);
  const addExpense = useAppStore((s) => s.addExpense);
  const expenses = useAppStore((s) => s.expenses);
  const weeklyBudget = useAppStore((s) => s.weeklyBudget);
  const [taskOpen, setTaskOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedDateString = toDateString(selectedDate);
  const budget = useMemo(() => getBudgetSummary(expenses, weeklyBudget), [expenses, weeklyBudget]);

  return (
    <PageShell>
      <TodayHeader selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <TaskProgressCard selectedDate={selectedDateString} />
      <TodayTasks selectedDate={selectedDateString} />
      <MoneyLeftCard remaining={Math.round(Math.max(0, budget.remaining))} spent={Math.round(budget.spent)} total={weeklyBudget} />
      <BillsDueCard />
      <div className="grid grid-cols-2 gap-3 pt-1">
        <AddButton variant="tertiary" onClick={() => setTaskOpen(true)}><ClipboardPlus size={21} strokeWidth={2} /> <span>Add Task</span></AddButton>
        <AddButton variant="quaternary" onClick={() => setExpenseOpen(true)}><PiggyBank size={24} strokeWidth={1.75} /> <span>Add Expense</span></AddButton>
      </div>
      <AddTask open={taskOpen} onClose={() => setTaskOpen(false)} defaultDate={selectedDateString} onSave={(task) => addTask(task)} />
      <AddExpense open={expenseOpen} onClose={() => setExpenseOpen(false)} onSave={(expense) => addExpense(expense)} />
    </PageShell>
  );
};

export default TodayPage;
