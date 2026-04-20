import { useState } from "react";
import { ClipboardPlus, PiggyBank } from "lucide-react";

import TodayHeader from "@/components/TodayHeader";
import TodayTasks from "@/components/TodayTasks";
import MoneyLeftCard from "@/components/MoneyLeftCard";
import BillsDueCard from "@/components/BillsDueCard";
import AddButton from "@/components/AddButton";
import TaskProgressCard from "@/components/TaskProgressCard";

import AddTask from "@/components/modal/AddTask";
import AddExpense from "@/components/modal/AddExpense";

import { useAppStore } from "@/store/useAppStore";

import { toDateString } from "@/lib/date";

const Dashboard = () => {
  const addTask = useAppStore((s) => s.addTask);
  const addExpense = useAppStore((s) => s.addExpense);
  const expenses = useAppStore((s) => s.expenses);
  const weeklyBudget = useAppStore((s) => s.weeklyBudget);

  const [taskOpen, setTaskOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);

  // ✅ YOU WERE MISSING THIS
  const [selectedDate, setSelectedDate] = useState(new Date());

  // ✅ SAFE DATE (FIXED)
  const selectedDateString = toDateString(selectedDate);

  const spent = expenses.reduce((s, e) => s + e.amount, 0);
  const remaining = Math.max(0, weeklyBudget - spent);

  return (
    <div className="space-y-5">
      <TodayHeader selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <TaskProgressCard selectedDate={selectedDateString} />
      <TodayTasks selectedDate={selectedDateString} />

      <MoneyLeftCard remaining={Math.round(remaining)} spent={Math.round(spent)} total={weeklyBudget} />

      <BillsDueCard />

      <div className="grid grid-cols-2 gap-3 pt-1">
        <AddButton variant="tertiary" onClick={() => setTaskOpen(true)}>
          <ClipboardPlus size={21} strokeWidth={2} className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.22)]" />
          <span className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.22)]">Add Task</span>
        </AddButton>

        <AddButton variant="quaternary" onClick={() => setExpenseOpen(true)}>
          <PiggyBank size={24} strokeWidth={1.75} className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.22)]" />
          <span className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.22)]">Add Expense</span>
        </AddButton>
      </div>

      <AddTask
        open={taskOpen}
        onClose={() => setTaskOpen(false)}
        defaultDate={selectedDateString}
        onSave={(t) => addTask(t.label, t.date, t.time, t.priority, t.recurrence, t.category)}
      />

      <AddExpense
        open={expenseOpen}
        onClose={() => setExpenseOpen(false)}
        onSave={(e) => addExpense(e.name, e.amount)}
      />
    </div>
  );
};

export default Dashboard;
