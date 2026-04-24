import { useState } from "react";
import { Plus } from "lucide-react";

import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import AddTask from "@/components/modal/AddTask";
import EditTask from "@/components/modal/EditTask";
import PageShell from "@/app/layout/PageShell";

import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { getToday } from "@/shared/lib/date";

import { TaskListContainer } from "@/features/tasks/containers/TaskListContainer";
import { TaskInsights } from "@/features/tasks/components/TaskInsights";

import type { Task } from "@/features/tasks/types";
import { TaskProgress } from "@/features/tasks/components/TaskProgress";

const TasksPage = () => {
  const addTask = useTasksStore((s) => s.addTask);
  const updateTask = useTasksStore((s) => s.updateTask);
  const deleteTask = useTasksStore((s) => s.deleteTask);

  const today = getToday();

  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  return (
    <PageShell>
      <div className="space-y-4">
        <PageHeader title="Tasks" />
<TaskProgress />   {/* 👈 NEW */}
        {/* 🧠 INSIGHTS (NEW — P2.2) */}
        <TaskInsights />

        {/* ✅ TASK LIST */}
        <div
          className="
            rounded-2xl
            bg-white/60
            backdrop-blur-md
            border border-white/40
            p-3
          "
        >
          <TaskListContainer onSelectTask={handleSelectTask} />
        </div>

        {/* ADD BUTTON */}
        <div className="pt-2">
          <ActionButton fullWidth onClick={() => setOpen(true)}>
            <Plus size={16} /> Add Task
          </ActionButton>
        </div>
      </div>

      {/* ADD TASK */}
      <AddTask
        open={open}
        onClose={() => setOpen(false)}
        defaultDate={today}
        onSave={addTask}
      />

      {/* EDIT TASK */}
      <EditTask
        open={editOpen}
        task={selectedTask}
        onClose={() => setEditOpen(false)}
        onSave={(updated) => {
          if (!selectedTask) return;

          updateTask(updated.id, {
            label: updated.label,
            date: updated.date,
            time: updated.time,
            category: updated.category,
            notes: updated.notes,
            recurrence: updated.recurrence,
          });

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