import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "@/components/layout/Header";
import { Body } from "@/components/ui/Text";
import { AddTaskModal, EditTaskModal } from "@/features/tasks";
import { TaskRow } from "@/features/tasks/components/TaskRow";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { getToday } from "@/shared/lib/date";

import type { Task } from "@/features/tasks/types/types";
import type { TaskRowVM } from "@/features/tasks/hooks/useTasks";

const spring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 25,
};

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
    const task = tasks.find((t) => String(t.id) === id) ?? null;
    if (!task) return;
    setSelectedTask(task);
    setEditOpen(true);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const isCompleted = task.completedDates.includes(today);
      const isToday = task.date === today;

      if (tab === "Completed") return isCompleted;
      if (tab === "Today") return !isCompleted && isToday;
      if (tab === "Upcoming") return !isCompleted && !isToday;
      return false;
    });
  }, [tasks, tab, today]);

  const taskRowVMs: TaskRowVM[] = useMemo(() => {
    return filteredTasks.map((task) => ({
      id: String(task.id),
      title: task.label,
      subtitle: task.time ? `${task.time}` : task.date,
      isCompleted: task.completedDates.includes(today),
      category: task.category ?? null,
    }));
  }, [filteredTasks, today]);

  const highPriorityTasks = taskRowVMs.slice(0, 3);
  const otherTasks = taskRowVMs.slice(3);

  return (
    <>
      <div className="relative min-h-screen bg-white px-4 pt-4 pb-28 space-y-4">
        <Header title="Tasks" />

        {/* Tabs */}
        <div className="flex gap-2">
          {(["Today", "Upcoming", "Completed"] as const).map((tabName) => (
            <motion.button
              key={tabName}
              onClick={() => setTab(tabName)}
              whileTap={{ scale: 0.95 }}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${
                  tab === tabName
                    ? "bg-gradient-hero text-white shadow-md"
                    : "text-slate-500 hover:text-slate-700"
                }
              `}
            >
              {tabName}
            </motion.button>
          ))}
        </div>

        {/* Task List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {taskRowVMs.length === 0 ? (
              <div className="py-10 text-center space-y-2">
                <Body className="font-medium">No tasks yet</Body>
                <Body className="text-sm text-muted-foreground">
                  Add your first task to get started
                </Body>
              </div>
            ) : (
              <>
                {highPriorityTasks.length > 0 && (
                  <div className="space-y-2">
                    <Body className="text-sm font-semibold text-slate-700">
                      High Priority
                    </Body>

                    {highPriorityTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        layout
                        whileTap={{ scale: 0.98 }}
                        transition={spring}
                        className="
                          rounded-2xl
                          px-4 py-3
                          bg-white
                          border border-black/5
                          shadow-[0_8px_24px_rgba(0,0,0,0.06)]
                        "
                      >
                        <TaskRow
                          task={task}
                          onToggleTask={(id) => toggleTask(id, today)}
                          onSelectTask={handleSelectTask}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}

                {otherTasks.length > 0 && (
                  <div className="space-y-2 mt-2">
                    <Body className="text-sm font-semibold text-slate-700">
                      Other Tasks
                    </Body>

                    {otherTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        layout
                        whileTap={{ scale: 0.98 }}
                        transition={spring}
                        className="
                          rounded-2xl
                          px-4 py-3
                          bg-white
                          border border-black/5
                          shadow-[0_8px_24px_rgba(0,0,0,0.06)]
                        "
                      >
                        <TaskRow
                          task={task}
                          onToggleTask={(id) => toggleTask(id, today)}
                          onSelectTask={handleSelectTask}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* FAB */}
        <motion.button
          onClick={() => setOpen(true)}
          whileTap={{ scale: 0.9 }}
          className="
            fixed bottom-24 right-4
            w-14 h-14
            rounded-full
            bg-gradient-hero
            text-white
            flex items-center justify-center
            shadow-[0_10px_30px_rgba(0,0,0,0.15)]
          "
        >
          <Plus size={22} />
        </motion.button>
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