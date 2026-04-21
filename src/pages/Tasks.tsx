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
import { getToday, formatDisplayDate } from "@/lib/date";
import clsx from "clsx";

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
    overdue: true,
    upcoming: false,
    previous: false,
  });

  const todayStr = getToday();

  // ✅ SAFE CHECK
  const isDone = (t: any) => t.completedDates?.includes(todayStr);

  // ✅ SORT FUNCTION
  const sortTasks = (items: typeof tasks) => {
    return [...items].sort((a, b) => {
      const aDone = isDone(a);
      const bDone = isDone(b);

      if (aDone === bDone) return 0;
      return aDone ? 1 : -1;
    });
  };

  // ✅ GROUPS
  const todayTasks = sortTasks(tasks.filter((t) => t.date === todayStr));

  const overdueTasks = sortTasks(
    tasks.filter((t) => t.date < todayStr && !isDone(t)).sort((a, b) => a.date.localeCompare(b.date)),
  );

  const upcomingTasks = sortTasks(tasks.filter((t) => t.date > todayStr));

  // ✅ PREVIOUS (ANY COMPLETED)
  const previousTasks = tasks.filter((t) => (t.completedDates?.length ?? 0) > 0);

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // ✅ CLEAN SUBTITLE BUILDER
  const buildSubtitle = (t: any) => {
    const parts = [];

    if (t.notes) parts.push(t.notes);
    if (t.date) parts.push(formatDisplayDate(t.date) + (t.time ? ` ${t.time}` : ""));

    return parts.join(" • ");
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
      <button onClick={onToggle} className="flex items-center justify-between w-full text-left">
        <p className={clsx("text-sm font-semibold", title.includes("Overdue") && "text-red-500")}>{title}</p>
        <span className="text-xs">{isOpen ? "▼" : "▶"}</span>
      </button>

      {isOpen && (
        <div className="space-y-1 transition-all duration-300">
          {items.length === 0 ? (
            <p className="text-xs text-muted-foreground px-1">No tasks</p>
          ) : (
            items.map((t) => {
              const done = isDone(t);

              return (
                <div
                  key={t.id}
                  className={clsx(
                    "transition-all duration-300 ease-in-out",
                    done ? "opacity-50 translate-y-2 scale-[0.98]" : "opacity-100 translate-y-0 scale-100",
                  )}
                >
                  <ListItem
                    label={t.label}
                    subtitle={buildSubtitle(t)}
                    category={t.category}
                    checked={done}
                    onToggle={() => toggleTask(t.id, todayStr)}
                    onClick={() => {
                      setSelectedTask(t);
                      setEditOpen(true);
                    }}
                  />
                </div>
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

      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <AppCard className="space-y-4">
        {activeTab === "Today" && (
          <>
            <Section
              title="Today"
              isOpen={openSections.today}
              onToggle={() => toggleSection("today")}
              items={todayTasks}
            />

            <Section
              title="Overdue ⚠️"
              isOpen={openSections.overdue}
              onToggle={() => toggleSection("overdue")}
              items={overdueTasks}
            />

            <Section
              title="Upcoming"
              isOpen={openSections.upcoming}
              onToggle={() => toggleSection("upcoming")}
              items={upcomingTasks}
            />

            <Section
              title="Previous"
              isOpen={openSections.previous}
              onToggle={() => toggleSection("previous")}
              items={previousTasks}
            />
          </>
        )}

        {activeTab === "Weekly" && (
          <p className="text-sm text-muted-foreground text-center py-6">Weekly tasks (recurring view coming next)</p>
        )}

        {activeTab === "Monthly" && (
          <p className="text-sm text-muted-foreground text-center py-6">Monthly overview coming soon</p>
        )}
      </AppCard>

      <ActionButton fullWidth onClick={() => setOpen(true)}>
        <Plus size={16} />
        Add Task
      </ActionButton>

      <AddTask
        open={open}
        onClose={() => setOpen(false)}
        defaultDate={todayStr}
        onSave={(t) => addTask(t.label, t.date, t.time || undefined, t.recurrence, t.category, t.notes || undefined)}
      />

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
