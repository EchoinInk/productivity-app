import { useState } from "react";
import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import TabBar from "@/components/TabBar";
import { Plus } from "lucide-react";
import { useAppStore, TaskCategory } from "@/store/useAppStore";
import AddTask from "@/components/modal/AddTask";

const tabs: TaskCategory[] = ["Today", "Upcoming", "Weekly", "Monthly"];

const Tasks = () => {
  const tasks = useAppStore((s) => s.tasks);
  const toggleTask = useAppStore((s) => s.toggleTask);
  const addTask = useAppStore((s) => s.addTask);

  const [activeTab, setActiveTab] = useState<TaskCategory>("Today");
  const [open, setOpen] = useState(false);

  const filtered = tasks.filter((t) => t.category === activeTab);

  return (
    <div className="space-y-5">
      <PageHeader title="Tasks" />

      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as TaskCategory)} />

      <AppCard>
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">No tasks in this category</p>
        ) : (
          <div className="space-y-1">
            {filtered.map((t) => (
              <ListItem
                key={t.id}
                label={t.label}
                checked={t.done}
                onToggle={() => toggleTask(t.id)}
                category={t.category}
              />
            ))}
          </div>
        )}
      </AppCard>

      <ActionButton fullWidth variant="primary" onClick={() => setOpen(true)}>
        <Plus size={16} />
        Add Task
      </ActionButton>

      <AddTask
        open={open}
        onClose={() => setOpen(false)}
        onSave={(t) => addTask(t.label, t.category, t.date, t.time, t.type)}
      />
    </div>
  );
};

export default Tasks;
