import { useState } from "react"; // ✅ ADD THIS
import { ClipboardPlus, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router-dom";

import TodayHeader from "@/components/TodayHeader";
import TodayTasks from "@/components/TodayTasks";
import MoneyLeftCard from "@/components/MoneyLeftCard";
import BillsDueCard from "@/components/BillsDueCard";
import AddButton from "@/components/AddButton";

import AddTask from "@/components/modal/AddTask";
import AddExpense from "@/components/modal/AddExpense";

import { useAppStore } from "@/store/useAppStore"; // ✅ for adding task

const Dashboard = () => {
  const navigate = useNavigate();

  const addTask = useAppStore((s) => s.addTask); // ✅ hook into store

  const [taskOpen, setTaskOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);

  return (
    <div className="space-y-5">
      <TodayHeader />
      <TodayTasks />
      <MoneyLeftCard />
      <BillsDueCard />

      <div className="grid grid-cols-2 gap-3 pt-1">
        {/* ADD TASK */}
        <AddButton variant="secondary" onClick={() => setTaskOpen(true)}>
          <ClipboardPlus size={21} strokeWidth={2} className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.22)]" />
          <span className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.22)]">Add Task</span>
        </AddButton>

        {/* ADD EXPENSE */}
        <AddButton variant="tertiary" onClick={() => setExpenseOpen(true)}>
          <PiggyBank size={24} strokeWidth={1.75} className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.22)]" />
          <span className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.22)]">Add Expense</span>
        </AddButton>
      </div>

      {/* 🔥 MODALS (THIS WAS MISSING) */}
      <AddTask
        open={taskOpen}
        onClose={() => setTaskOpen(false)}
        onSave={(task) => addTask(task.label, task.category)}
      />

      <AddExpense
        open={expenseOpen}
        onClose={() => setExpenseOpen(false)}
        onSave={(expense) => console.log(expense)} // wire later
      />
    </div>
  );
};

export default Dashboard;
