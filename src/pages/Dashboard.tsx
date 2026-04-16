import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import { CheckSquare, DollarSign, UtensilsCrossed, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ❌ TEMP: remove Zustand until preview is stable
// import { useAppStore } from "@/store/useAppStore";

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const mockTasks = [
  { id: 1, label: "Review weekly goals", done: false },
  { id: 2, label: "Buy groceries", done: true },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      <PageHeader title="Today" subtitle={today} />

      {/* ✅ CONFIRM APP WORKS */}
      <h1 style={{ color: "red" }}>PREVIEW WORKING</h1>

      <button onClick={() => console.log("Button working")} className="bg-red-500 text-white p-2 rounded">
        TEST BUTTON
      </button>

      {/* Tasks */}
      <AppCard>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold text-muted-foreground">Today's Tasks</h2>
          <span className="text-xs text-muted-foreground">{mockTasks.filter((t) => !t.done).length} left</span>
        </div>

        <div className="space-y-1">
          {mockTasks.map((t) => (
            <ListItem key={t.id} label={t.label} checked={t.done} />
          ))}
        </div>
      </AppCard>

      {/* Budget */}
      <AppCard gradient="budget">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold opacity-80">Weekly Budget</h2>
          <p className="text-3xl font-bold">$342.50</p>
          <p className="text-sm opacity-80">remaining of $500</p>
        </div>
      </AppCard>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <ActionButton variant="primary" fullWidth onClick={() => navigate("/tasks")}>
          <CheckSquare size={16} />
          Add Task
        </ActionButton>

        <ActionButton variant="primary" fullWidth onClick={() => navigate("/budget")}>
          <DollarSign size={16} />
          Add Expense
        </ActionButton>

        <ActionButton variant="secondary" fullWidth onClick={() => navigate("/meals")}>
          <UtensilsCrossed size={16} />
          Add Meal
        </ActionButton>

        <ActionButton variant="secondary" fullWidth onClick={() => navigate("/shopping")}>
          <ShoppingCart size={16} />
          Add Item
        </ActionButton>
      </div>
    </div>
  );
};

export default Dashboard;
