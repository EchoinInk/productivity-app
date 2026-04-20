import { Plus, FolderPlus } from "lucide-react";
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
          <Plus size={18} strokeWidth={2.5} />
          Add Task
        </AddButton>

        <AddButton variant="tertiary" onClick={() => navigate("/budget")}>
          <FolderPlus size={18} strokeWidth={2.5} />
          Add Expense
        </AddButton>
      </div>
    </div>
  );
};

export default Dashboard;
