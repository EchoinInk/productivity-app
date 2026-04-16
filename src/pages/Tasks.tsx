import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import TabBar from "@/components/TabBar";
import PageHeader from "@/components/PageHeader";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";

const tabs = ["Today", "Upcoming", "Weekly", "Monthly"];

const Tasks = () => {
  const [activeTab, setActiveTab] = useState("Today");

  const tasks = useAppStore((s) => s.tasks);
  const toggleTask = useAppStore((s) => s.toggleTask);

  const filtered = tasks.filter((t) => t.category === activeTab);

  return (
    <div className="space-y-5">
      <PageHeader title="Tasks" />

      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <AppCard>
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            No tasks here yet
          </p>
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

      <ActionButton fullWidth variant="primary">
        <Plus size={16} />
        Add Task
      </ActionButton>
    </div>
  );
};

export default Tasks;
