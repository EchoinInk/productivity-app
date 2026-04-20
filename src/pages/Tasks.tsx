import { useState } from "react";
import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import TabBar from "@/components/TabBar";
import { Plus } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import AddTask from "@/components/modal/AddTask";

const tabs = ["Today", "Upcoming", "Weekly", "Monthly"];

const Tasks = () => {
  const tasks = useAppStore((s) => s.tasks);
  const toggleTask = useAppStore((s) => s.toggleTask);
  const addTask = useAppStore((s) => s.addTask);

  const [activeTab, setActiveTab] = useState("Today");
  const [open, setOpen] = useState(false);

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const filtered = tasks.filter((t) => {
    const d = new Date(t.date);

    if (activeTab === "Today") return d.toDateString() === today.toDateString();
    if (activeTab === "Upcoming") return d > today;
    if (activeTab === "Weekly") return d <= new Date(Date.now() + 7 * 86400000);
    if (activeTab === "Monthly") return d.getMonth() === today.getMonth();

    return false;
  });

  return (
    <div className="space-y-5">
      <PageHeader title="Tasks" />

      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <AppCard>
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No tasks</p>
        ) : (
          filtered.map((t) => {
            const done = t.completedDates.includes(todayStr);

            return <ListItem key={t.id} label={t.label} checked={done} onToggle={() => toggleTask(t.id, todayStr)} />;
          })
        )}
      </AppCard>

      <ActionButton fullWidth onClick={() => setOpen(true)}>
        <Plus size={16} />
        Add Task
      </ActionButton>

      <AddTask
        open={open}
        onClose={() => setOpen(false)}
        onSave={(t) => addTask(t.label, t.date || todayStr, t.time, t.type, t.recurrence)}
      />
    </div>
  );
};

export default Tasks;
