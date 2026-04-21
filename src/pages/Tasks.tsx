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

const tabs = ["Today", "Weekly", "Monthly"];

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

  const [openSections, setOpenSections] = useState({
    today: true,
    upcoming: false,
    yesterday: false,
  });

  const today = new Date();
  const todayStr = getToday();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  // ✅ GROUPS
  const todayTasks = tasks.filter((t) => t.date === todayStr);
  const upcomingTasks = tasks.filter((t) => t.date > todayStr);
  const yesterdayTasks = tasks.filter((t) => t.date === yesterdayStr);

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // ✅ SECTION COMPONENT
  const Section = ({
    title,
    isOpen,
    onToggle,
    items,
  }: {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
    items: typeof tasks;
  }) => (
    <div className="space-y-2">
      {/* HEADER */}
      <button onClick={onToggle} className="flex items-center justify-between w-full text-left">
        <p className="text-sm font-semibold">{title}</p>
        <span className="text-xs">{isOpen ? "▼" : "▶"}</span>
      </button>

      {/* CONTENT */}
      {isOpen && (
        <div className="space-y-1">
          {items.length === 0 ? (
            <p className="text-xs text-muted-foreground px-1">No tasks</p>
          ) : (
            items.map((t) => {
              const done = t.completedDates.includes(todayStr);

              return (
                <ListItem
                  key={t.id}
                  label={t.label}
                  subtitle={t.time ? `${t.notes || ""} • ${t.date} ${t.time}` : `${t.notes || ""} • ${t.date}`}
                  category={t.category}
                  checked={done}
                  onToggle={() => toggleTask(t.id, todayStr)}
                  onClick={() => {
                    setSelectedTask(t);
                    setEditOpen(true);
                  }}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-5">
      <PageHeader title="Tasks" />

      {/* ✅ TABS */}
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <AppCard className="space-y-4">
        {/* ✅ TODAY TAB */}
        {activeTab === "Today" && (
          <>
            <Section
              title="Today"
              isOpen={openSections.today}
              onToggle={() => toggleSection("today")}
              items={todayTasks}
            />

            <Section
              title="Upcoming"
              isOpen={openSections.upcoming}
              onToggle={() => toggleSection("upcoming")}
              items={upcomingTasks}
            />

            <Section
              title="Yesterday"
              isOpen={openSections.yesterday}
              onToggle={() => toggleSection("yesterday")}
              items={yesterdayTasks}
            />
          </>
        )}

        {/* ✅ WEEKLY TAB (placeholder for recurring) */}
        {activeTab === "Weekly" && (
          <p className="text-sm text-muted-foreground text-center py-6">Weekly tasks (recurring view coming next)</p>
        )}

        {/* ✅ MONTHLY TAB */}
        {activeTab === "Monthly" && (
          <p className="text-sm text-muted-foreground text-center py-6">Monthly overview coming soon</p>
        )}
      </AppCard>

      {/* ADD BUTTON */}
      <ActionButton fullWidth onClick={() => setOpen(true)}>
        <Plus size={16} />
        Add Task
      </ActionButton>

      {/* ADD TASK */}
      <AddTask
        open={open}
        onClose={() => setOpen(false)}
        defaultDate={todayStr}
        onSave={(t) => addTask(t.label, t.date, t.time, t.priority, t.recurrence, t.category, t.notes)}
      />

      {/* EDIT TASK */}
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
