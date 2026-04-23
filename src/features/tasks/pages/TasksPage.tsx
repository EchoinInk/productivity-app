import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Card } from "@/components/ui/Card";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import AddTask from "@/components/modal/AddTask";
import EditTask from "@/components/modal/EditTask";
import PageShell from "@/app/layout/PageShell";
import TaskSection from "@/features/tasks/components/TaskSection";

import { getTaskTimelineGroups } from "@/features/tasks/selectors/taskSelectors";
import { getToday } from "@/shared/lib/date";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import type { Task } from "@/features/tasks/types";

const TasksPage = () => {
  const tasks = useTasksStore((s) => s.tasks);
  const toggleTask = useTasksStore((s) => s.toggleTask);
  const addTask = useTasksStore((s) => s.addTask);
  const updateTask = useTasksStore((s) => s.updateTask);
  const deleteTask = useTasksStore((s) => s.deleteTask);

  const today = getToday();

  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const [openSections, setOpenSections] = useState({
    today: true,
    upcoming: false,
    yesterday: false,
  });

  const groups = useMemo(
    () => getTaskTimelineGroups(tasks, today),
    [tasks, today]
  );

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const selectTask = (task: Task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  const sections = [
    { key: "today", title: "Today", items: groups.today },
    { key: "upcoming", title: "Upcoming", items: groups.upcoming },
    { key: "yesterday", title: "Yesterday", items: groups.yesterday },
  ] as const;

  return (
    <PageShell>
      <div className="space-y-4">
        <PageHeader title="Tasks" />

        {/* SECTIONS (NO CARD WRAPPER) */}
        <div className="space-y-3">
          {sections.map((section) => (
            <TaskSection
              key={section.key}
              id={`tasks-${section.key}`}
              title={section.title}
              isOpen={openSections[section.key]}
              onToggle={() => toggleSection(section.key)}
              items={section.items}
              activeDate={today}
              onToggleTask={(task) =>
                toggleTask(task.id, task.date)
              }
              onSelectTask={selectTask}
            />
          ))}
        </div>

        <ActionButton fullWidth onClick={() => setOpen(true)}>
          <Plus size={16} /> Add Task
        </ActionButton>
      </div>

      {/* MODALS */}
      <AddTask
        open={open}
        onClose={() => setOpen(false)}
        defaultDate={today}
        onSave={addTask}
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
          if (!selectedTask) return;
          deleteTask(selectedTask.id);
          setSelectedTask(null);
          setEditOpen(false);
        }}
      />
    </PageShell>
  );
};

export default TasksPage;