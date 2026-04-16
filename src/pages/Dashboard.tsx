import { useState } from "react";
import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import { CheckSquare, DollarSign, UtensilsCrossed, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const Dashboard = () => {
  const navigate = useNavigate();

  const tasks = useAppStore((s) => s.tasks);
  const toggleTask = useAppStore((s) => s.toggleTask);
  const addTask = useAppStore((s) => s.addTask);

  const [newTask, setNewTask] = useState("");

  return (
    <div className="space-y-5">
      <PageHeader title="Today" subtitle={today} />

      {/* 🔥 ADD TASK INPUT */}
      <div className="flex gap-2">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 px-3 py-2 rounded-lg border border-border text-sm"
        />

        <button
          onClick={() => {
            if (!newTask.trim()) return;
            addTask(newTask);
            setNewTask("");
          }}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          Add
        </button>
      </div>

      {/* Tasks */}
      <AppCard>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold text-muted-foreground">Today's Tasks</h2>
          <span className="text-xs text-muted-foreground">{tasks.filter((t) => !t.done).length} left</span>
        </div>

        <div className="space-y-1">
          {tasks
            .filter((t) => t.category === "Today")
            .map((t) => (
              <ListItem key={t.id} label={t.label} checked={t.done} onToggle={() => toggleTask(t.id)} />
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
