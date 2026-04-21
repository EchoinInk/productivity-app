import { useState } from "react";
import AppCard from "@/components/AppCard";
import ListItem from "@/components/ListItem";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { Task, useAppStore } from "@/store/useAppStore";
import AddTask from "@/components/modal/AddTask";
import EditTask from "@/components/modal/EditTask";
import { getToday } from "@/lib/date";

const formatTaskDate = (date: string, time?: string) => {
  const parsed = new Date(`${date}T00:00:00`);
  const formatted = parsed.toLocaleDateString("en-GB", { day: "numeric", month: "short" });

  return time ? `${formatted} • ${time}` : formatted;
};

const sortByTime = (items: Task[]) =>
  [...items].sort((a, b) => {
    if (!a.time && !b.time) return 0;
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });

interface SectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  items: Task[];
  todayStr: string;
  onToggleTask: (id: number) => void;
  onSelectTask: (task: Task) => void;
}

const Section = ({ title, isOpen, onToggle, items, todayStr, onToggleTask, onSelectTask }: SectionProps) => (
  <section>
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between rounded-lg px-1 py-2 text-left transition-colors active:bg-muted/60 hover:bg-muted/40"
    >
      <span className="text-sm font-semibold text-foreground">{title}</span>
      {isOpen ? <ChevronDown size={16} className="text-muted-foreground" /> : <ChevronRight size={16} className="text-muted-foreground" />}
    </button>

    {isOpen && (
      <div className="animate-in fade-in-0 duration-150">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No tasks</p>
        ) : (
          <div className="space-y-1">
            {items.map((task) => {
              const done = task.completedDates.includes(todayStr);

              return (
                <ListItem
                  key={task.id}
                  label={task.label}
                  subtitle={task.notes}
                  meta={formatTaskDate(task.date, task.time)}
                  category={task.category}
                  checked={done}
                  onToggle={() => onToggleTask(task.id)}
                  onClick={() => onSelectTask(task)}
                />
              );
            })}
          </div>
        )}
      </div>
    )}
  </section>
);

const Tasks = () => {
  const tasks = useAppStore((s) => s.tasks);
  const toggleTask = useAppStore((s) => s.toggleTask);
  const addTask = useAppStore((s) => s.addTask);
  const updateTask = useAppStore((s) => s.updateTask);
  const deleteTask = useAppStore((s) => s.deleteTask);

  const [openSections, setOpenSections] = useState({
    today: true,
    upcoming: false,
    yesterday: false,
  });
  const [open, setOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);

  const todayStr = getToday();
  const yesterday = new Date(`${todayStr}T00:00:00`);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  const groupedTasks = {
    today: sortByTime(tasks.filter((task) => task.date === todayStr)),
    upcoming: sortByTime(tasks.filter((task) => task.date > todayStr)),
    yesterday: sortByTime(tasks.filter((task) => task.date === yesterdayStr)),
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((current) => ({ ...current, [section]: !current[section] }));
  };

  return (
    <div className="space-y-5">
      <PageHeader title="Tasks" />

      <AppCard>
        <div className="space-y-4">
          <Section
            title="Today"
            isOpen={openSections.today}
            onToggle={() => toggleSection("today")}
            items={groupedTasks.today}
            todayStr={todayStr}
            onToggleTask={(id) => toggleTask(id, todayStr)}
            onSelectTask={(task) => {
              setSelectedTask(task);
              setEditOpen(true);
            }}
          />
          <Section
            title="Upcoming"
            isOpen={openSections.upcoming}
            onToggle={() => toggleSection("upcoming")}
            items={groupedTasks.upcoming}
            todayStr={todayStr}
            onToggleTask={(id) => toggleTask(id, todayStr)}
            onSelectTask={(task) => {
              setSelectedTask(task);
              setEditOpen(true);
            }}
          />
          <Section
            title="Yesterday"
            isOpen={openSections.yesterday}
            onToggle={() => toggleSection("yesterday")}
            items={groupedTasks.yesterday}
            todayStr={todayStr}
            onToggleTask={(id) => toggleTask(id, todayStr)}
            onSelectTask={(task) => {
              setSelectedTask(task);
              setEditOpen(true);
            }}
          />
        </div>
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
