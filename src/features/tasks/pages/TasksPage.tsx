import { useState, useMemo } from "react";
import { Plus } from "lucide-react";

import Header from "@/components/layout/Header";
import { Body } from "@/components/ui/Text";
import { AddTaskModal, EditTaskModal } from "@/features/tasks";
import { TaskRow } from "@/features/tasks/components/TaskRow";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { getToday } from "@/shared/lib/date";

import type { Task } from "@/features/tasks/types/types";
import type { TaskRowVM } from "@/features/tasks/hooks/useTasks";

const TasksPage = () => {
  const { actions } = useTasks();
  const { addTask, updateTask, deleteTask, toggleTask } = actions;
  const tasks = useTasksStore((state) => state.tasks);

  const today = getToday();

  const [tab, setTab] = useState<"Today" | "Upcoming" | "Completed">("Today");
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleSelectTask = (id: string) => {
    const task = tasks.find(t => String(t.id) === id) ?? null;
    if (!task) return;
    setSelectedTask(task);
    setEditOpen(true);
  };

  // Filter tasks based on tab
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const isCompleted = task.completedDates.includes(today);
      const isToday = task.date === today;

      if (tab === "Completed") return isCompleted;
      if (tab === "Today") return !isCompleted && isToday;
      if (tab === "Upcoming") return !isCompleted && !isToday;
      return false;
    });
  }, [tasks, tab, today]);

  // Convert to TaskRowVM format for TaskRow component
  const taskRowVMs: TaskRowVM[] = useMemo(() => {
    return filteredTasks.map(task => ({
      id: String(task.id),
      title: task.label,
      subtitle: task.time ? `${task.time}` : task.date,
      isCompleted: task.completedDates.includes(today),
      category: task.category ?? null,
    }));
  }, [filteredTasks, today]);

  // Split into High Priority (top 2-3) and Other Tasks
  const highPriorityTasks = taskRowVMs.slice(0, 3);
  const otherTasks = taskRowVMs.slice(3);

  return (
    <>
      <div className="relative min-h-screen bg-white px-4 pt-4 pb-28 space-y-6">
        <Header title="Tasks" />

        {/* Tab Filters */}
        <div className="flex gap-2">
          {(["Today", "Upcoming", "Completed"] as Array<"Today" | "Upcoming" | "Completed">).map((tabName) => (
            <button
              key={tabName}
              type="button"
              onClick={() => setTab(tabName)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${tab === tabName
                  ? "bg-gradient-hero text-white shadow-md"
                  : "bg-white/70 text-muted-foreground hover:bg-white/80"
                }
              `}
            >
              {tabName}
            </button>
          ))}
        </div>

        {/* Task List */}
        {taskRowVMs.length === 0 ? (
          <div className="py-10 text-center space-y-2">
            <Body className="font-medium">No tasks yet</Body>
            <Body className="text-sm text-muted-foreground">Add your first task to get started</Body>
          </div>
        ) : (
          <>
            {/* High Priority Tasks */}
            {highPriorityTasks.length > 0 && (
              <div className="space-y-3">
                <Body className="text-sm font-semibold">High Priority</Body>
                {highPriorityTasks.map(task => (
                  <div
                    key={task.id}
                    className="
                      flex items-center gap-3
                      rounded-2xl
                      px-4 py-3
                      bg-white/80 backdrop-blur-md
                      border border-white/40
                      shadow-[0_6px_18px_rgba(0,0,0,0.06)]
                      transition
                      active:scale-[0.98]
                    "
                  >
                    <TaskRow
                      task={task}
                      onToggleTask={(id) => toggleTask(id, today)}
                      onSelectTask={handleSelectTask}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Other Tasks */}
            {otherTasks.length > 0 && (
              <div className="space-y-3">
                <Body className="text-sm font-semibold">Other Tasks</Body>
                {otherTasks.map(task => (
                  <div
                    key={task.id}
                    className="
                      flex items-center gap-3
                      rounded-2xl
                      px-4 py-3
                      bg-white/80 backdrop-blur-md
                      border border-white/40
                      shadow-[0_6px_18px_rgba(0,0,0,0.06)]
                      transition
                      active:scale-[0.98]
                    "
                  >
                    <TaskRow
                      task={task}
                      onToggleTask={(id) => toggleTask(id, today)}
                      onSelectTask={handleSelectTask}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Floating Action Button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
            fixed bottom-24 right-4
            w-14 h-14
            rounded-full
            bg-gradient-hero
            text-white
            shadow-lg
            flex items-center justify-center
            active:scale-95
            transition
          "
        >
          <Plus size={24} />
        </button>
      </div>

      <AddTaskModal
        open={open}
        onClose={() => setOpen(false)}
        defaultDate={tab === "Today" ? today : ""}
        onSave={addTask}
      />

      <EditTaskModal
        open={editOpen}
        task={selectedTask}
        onClose={() => setEditOpen(false)}
        onSave={(updated: Task) => {
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
    </>
  );
};

export default TasksPage;
