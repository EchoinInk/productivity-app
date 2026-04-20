import { ClipboardPlus, PiggyBank } from "lucide-react";
import { useNavigate } from "react-router-dom";

import TodayHeader from "@/components/TodayHeader";
import TodayTasks from "@/components/TodayTasks";
import MoneyLeftCard from "@/components/MoneyLeftCard";
import BillsDueCard from "@/components/BillsDueCard";
import AddButton from "@/components/AddButton";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <TodayHeader />
      <TodayTasks />
      <MoneyLeftCard />
      <BillsDueCard />

      <div className="grid grid-cols-2 gap-3 pt-1">
        <AddButton variant="secondary" onClick={() => navigate("/tasks")}>
          <ClipboardPlus size={22} strokeWidth={1.75} className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.22)]" />
          <span className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.22)]">Add Task</span>
        </AddButton>

        <AddButton variant="tertiary" onClick={() => navigate("/budget")}>
          <PiggyBank size={24} strokeWidth={1.75} className="drop-shadow-[0_1px_3px_rgba(0,0,0,0.22)]" />
          <span className="drop-shadow-[0_1px_4px_rgba(0,0,0,0.22)]">Add Expense</span>
        </AddButton>
      </div>
    </div>
  );
};

export default Dashboard;
