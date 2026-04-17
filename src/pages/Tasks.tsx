import { useState } from "react";
import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import TabBar from "@/components/TabBar";
import { Plus } from "lucide-react";
import { useAppStore, TaskCategory } from "@/store/useAppStore";

const tabs: TaskCategory[] = ["Today", "Upcoming", "Weekly", "Monthly"];

const Tasks = () => {
  const tasks = useAppStore((s) => s.tasks);
  const toggleTask = useAppStore((s) => s.toggleTask);

  const [activeTab, setActiveTab] = useState<TaskCategory>("Today");

  const filtered = tasks.filter((t) => t.category === activeTab);

  return (
    <div className="space-y-5">
      <PageHeader title="Tasks" />

      {/* TAB BAR */}
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
                category={t.category} // ✅ ADDED
              />
            ))}
          </div>
        )}
      </AppCard>

      <ActionButton fullWidth variant="primary">
        <Plus size={16} />
        Add Task
      </ActionButton>
    </div>
  );
};

export default Tasks;
