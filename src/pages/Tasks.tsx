import { useState } from "react";
import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import TabBar from "@/components/TabBar";
import { Plus } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import AddTask from "@/components/modal/AddTask";
import EditTask from "@/components/modal/EditTask";
import { getToday } from "@/lib/date";

const tabs = ["Today", "Upcoming", "Weekly", "Monthly"];

const Tasks = () => {
  const tasks = useAppStore((s) => s.tasks);
  const toggleTask = useAppStore((s) => s.toggleTask);
  const addTask = useAppStore((s) => s.addTask);
  const updateTask = useAppStore((s) => s.updateTask);
  const deleteTask = useAppStore((s) => s.deleteTask);

  const [activeTab, setActiveTab] = useState("Today");
  const [open, setOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);

  const today = new Date();
  const todayStr = getToday();

  const filtered = tasks.filter((t) => {
    const d = new Date(t.date);

    if (activeTab === "Today") {
      return d.toDateString() === today.toDateString();
    }

    if (activeTab === "Upcoming") {
      return d > today;
    }

    if (activeTab === "Weekly") {
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      return d >= today && d <= nextWeek;
    }

    if (activeTab === "Monthly") {
      return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
    }

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
          <div className="space-y-1">
            {filtered.map((t) => {
              const done = t.completedDates.includes(todayStr);

              return (
                <ListItem
                  key={t.id}
                  label={t.label}
                  subtitle={t.notes}
                  category={t.category}
                  checked={done}
                  onToggle={() => toggleTask(t.id, todayStr)}
                  onClick={() => {
                    setSelectedTask(t);
                    setEditOpen(true);
                  }}
                />
              );
            })}
          </div>
        )}
      </AppCard>

      {/* ADD BUTTON */}
      <ActionButton fullWidth onClick={() => setOpen(true)}>
        <Plus size={16} />
        Add Task
      </ActionButton>

      {/* ADD TASK MODAL */}
      <AddTask
        open={open}
        onClose={() => setOpen(false)}
        defaultDate={todayStr}
        onSave={(t) => addTask(t.label, t.date, t.time, t.priority, t.recurrence, t.category, t.notes)}
      />

      {/* EDIT TASK MODAL */}
      <EditTask
        open={editOpen}
        task={selectedTask}
        onClose={() => setEditOpen(false)}
        onSave={(updated) => {
          updateTask(updated);
          setEditOpen(false);
        }}
        onDelete={() => {
          deleteTask(selectedTask.id);
          setEditOpen(false);
        }}
      />
    </div>
  );
};

export default Tasks;
