import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import { Plus } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const Tasks = () => {
  const tasks = useAppStore((s) => s.tasks);
  const toggleTask = useAppStore((s) => s.toggleTask);

  return (
    <div className="space-y-5">
      <PageHeader title="Tasks" />

      <AppCard>
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            No tasks yet
          </p>
        ) : (
          <div className="space-y-1">
            {tasks.map((t) => (
              <ListItem
                key={t.id}
                label={t.label}
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
