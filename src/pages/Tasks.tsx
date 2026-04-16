import { useState } from "react";
import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import TabBar from "@/components/TabBar";
import PageHeader from "@/components/PageHeader";
import { Plus } from "lucide-react";

interface Task {
  id: number;
  label: string;
  done: boolean;
  due?: string;
  category: string;
}

const initialTasks: Task[] = [
  { id: 1, label: "Review weekly goals", done: false, category: "Today" },
  { id: 2, label: "Buy groceries", done: true, category: "Today" },
  { id: 3, label: "Call dentist", done: false, due: "Tomorrow", category: "Upcoming" },
  { id: 4, label: "Clean apartment", done: false, due: "Saturday", category: "Weekly" },
  { id: 5, label: "File taxes", done: false, due: "Apr 30", category: "Monthly" },
];

const tabs = ["Today", "Upcoming", "Weekly", "Monthly"];

const Tasks = () => {
  const [activeTab, setActiveTab] = useState("Today");
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const filtered = tasks.filter((t) => t.category === activeTab);

  return (
    <div className="space-y-5">
      <PageHeader title="Tasks" />

      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <AppCard>
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">No tasks here yet</p>
        ) : (
          <div className="space-y-1">
            {filtered.map((t) => (
              <ListItem
                key={t.id}
                label={t.label}
                subtitle={t.due}
                checked={t.done}
                onToggle={() => toggleTask(t.id)}
              />
            ))}
          </div>
        )}
      </AppCard>

      {/* Primary Action */}
      <ActionButton fullWidth variant="primary">
        <Plus size={16} />
        Add Task
      </ActionButton>
    </div>
  );
};

export default Tasks;
