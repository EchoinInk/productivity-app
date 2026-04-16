import { useState } from "react";
import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import { CheckSquare, DollarSign, UtensilsCrossed, ShoppingCart } from "lucide-react";
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

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <PageHeader title="Today" subtitle={today} />

      {/* Today's Tasks */}
      <AppCard>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold text-muted-foreground">Today's Tasks</h2>
          <span className="text-xs text-muted-foreground">{tasks.filter((t) => !t.done).length} left</span>
        </div>

        <div className="space-y-1">
          {tasks.map((t) => (
            <ListItem key={t.id} label={t.label} checked={t.done} onToggle={() => toggleTask(t.id)} />
          ))}
        </div>
      </AppCard>

      {/* Budget Summary (HERO CARD) */}
      <AppCard gradient="budget">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold opacity-80">Weekly Budget</h2>

          <p className="text-3xl font-bold">$342.50</p>

          <p className="text-sm opacity-80">remaining of $500</p>

          {/* Progress Bar */}
          <div className="mt-3 h-2 w-full rounded-full bg-white/30 overflow-hidden">
            <div className="h-full w-[68%] bg-white rounded-full" />
          </div>
        </div>
      </AppCard>

      {/* Upcoming Bills */}
      <AppCard>
        <h2 className="text-sm font-semibold text-muted-foreground mb-2">Upcoming Bills</h2>

        <div className="space-y-1">
          <ListItem
            label="Netflix"
            subtitle="Apr 20"
            rightContent={<span className="text-sm font-semibold text-foreground">$15.99</span>}
          />
          <ListItem
            label="Electricity"
            subtitle="Apr 25"
            rightContent={<span className="text-sm font-semibold text-foreground">$85.00</span>}
          />
        </div>
      </AppCard>

      {/* Today's Meals */}
      <AppCard>
        <h2 className="text-sm font-semibold text-muted-foreground mb-2">Today's Meals</h2>

        <div className="space-y-1">
          <ListItem label="Oatmeal with berries" subtitle="Breakfast" />
          <ListItem label="Chicken salad wrap" subtitle="Lunch" />
          <ListItem label="Pasta primavera" subtitle="Dinner" />
        </div>
      </AppCard>

      {/* Quick Actions */}
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
