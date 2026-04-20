import { useState } from "react";
import { ClipboardPlus, PiggyBank } from "lucide-react";

import TodayHeader from "@/components/TodayHeader";
import TodayTasks from "@/components/TodayTasks";
import MoneyLeftCard from "@/components/MoneyLeftCard";
import BillsDueCard from "@/components/BillsDueCard";
import AddButton from "@/components/AddButton";

import AddTask from "@/components/modal/AddTask";
import AddExpense from "@/components/modal/AddExpense";

import { useAppStore } from "@/store/useAppStore";

const Dashboard = () => {
  const addTask = useAppStore((s) => s.addTask);
  const addExpense = useAppStore((s) => s.addExpense);
  const expenses = useAppStore((s) => s.expenses);
  const weeklyBudget = useAppStore((s) => s.weeklyBudget);

  const [taskOpen, setTaskOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const selectedDateString = selectedDate.toISOString().split("T")[0];

  const spent = expenses.reduce((s, e) => s + e.amount, 0);
  const remaining = Math.max(0, weeklyBudget - spent);

  return (
    <div className="space-y-5">
      <TodayHeader selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <TodayTasks selectedDate={selectedDateString} />

      <MoneyLeftCard remaining={Math.round(remaining)} spent={Math.round(spent)} total={weeklyBudget} />

      <BillsDueCard />

      <div className="grid grid-cols-2 gap-3 pt-1">
        <AddButton variant="secondary" onClick={() => setTaskOpen(true)}>
          <ClipboardPlus size={21} />
          Add Task
        </AddButton>

        <AddButton variant="tertiary" onClick={() => setExpenseOpen(true)}>
          <PiggyBank size={24} />
          Add Expense
        </AddButton>
      </div>

      <AddTask
        open={taskOpen}
        onClose={() => setTaskOpen(false)}
        onSave={(t) => addTask(t.label, selectedDateString, t.time, t.type, t.recurrence)}
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
