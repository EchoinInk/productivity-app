import { useState } from "react";
import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import { Plus, CheckSquare, DollarSign, UtensilsCrossed, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: 1, label: "Review weekly goals", done: false },
    { id: 2, label: "Buy groceries", done: true },
    { id: 3, label: "Call dentist", done: false },
  ]);

  const toggleTask = (id: number) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <PageHeader title="Today" subtitle={today} />

      {/* Today's Tasks */}
      <AppCard>
        <h2 className="text-sm font-semibold text-muted-foreground mb-1">Today's Tasks</h2>
        {tasks.map((t) => (
          <ListItem key={t.id} label={t.label} checked={t.done} onToggle={() => toggleTask(t.id)} />
        ))}
      </AppCard>

      {/* Budget Summary */}
      <AppCard gradient="budget">
        <h2 className="text-sm font-semibold opacity-80 mb-2">Weekly Budget</h2>
        <p className="text-3xl font-bold">$342.50</p>
        <p className="text-sm opacity-80 mt-1">remaining of $500</p>
      </AppCard>

      {/* Upcoming Bills */}
      <AppCard>
        <h2 className="text-sm font-semibold text-muted-foreground mb-1">Upcoming Bills</h2>
        <ListItem label="Netflix" subtitle="Apr 20" rightContent={<span className="text-sm font-semibold text-foreground">$15.99</span>} />
        <ListItem label="Electricity" subtitle="Apr 25" rightContent={<span className="text-sm font-semibold text-foreground">$85.00</span>} />
      </AppCard>

      {/* Today's Meals */}
      <AppCard>
        <h2 className="text-sm font-semibold text-muted-foreground mb-1">Today's Meals</h2>
        <ListItem label="Oatmeal with berries" subtitle="Breakfast" />
        <ListItem label="Chicken salad wrap" subtitle="Lunch" />
        <ListItem label="Pasta primavera" subtitle="Dinner" />
      </AppCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <ActionButton variant="secondary" fullWidth onClick={() => navigate("/tasks")}>
          <CheckSquare size={16} /> Add Task
        </ActionButton>
        <ActionButton variant="secondary" fullWidth onClick={() => navigate("/budget")}>
          <DollarSign size={16} /> Add Expense
        </ActionButton>
        <ActionButton variant="secondary" fullWidth onClick={() => navigate("/meals")}>
          <UtensilsCrossed size={16} /> Add Meal
        </ActionButton>
        <ActionButton variant="secondary" fullWidth onClick={() => navigate("/shopping")}>
          <ShoppingCart size={16} /> Add Item
        </ActionButton>
      </div>
    </div>
  );
};

export default Dashboard;
