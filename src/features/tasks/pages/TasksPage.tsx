import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "@/components/layout/Header";
import { Body } from "@/components/ui/Text";
import { ListItemCard } from "@/components/ui/ListItemCard";
import { AddTaskModal, EditTaskModal } from "@/features/tasks";
import { TaskRow } from "@/features/tasks/components/TaskRow";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { getToday } from "@/shared/lib/date";

import type { Task } from "@/features/tasks/types/types";

const TasksPage = () => {
  const { sections, actions } = useTasks();
  const { addTask, updateTask, deleteTask, toggleTask } = actions;

  const [tab, setTab] = useState<"Today" | "Upcoming" | "Completed">("Today");
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleSelectTask = (id: string) => {
    const section = sections.find((s) => s.type === tab.toLowerCase() as any);
    const task = section?.tasks.find((t) => t.id === id);
    if (!task) return;
    const originalTask = sections.flatMap(s => s.tasks).find(t => t.id === id);
    if (!originalTask) return;
    setSelectedTask({
      id: originalTask.id,
      label: originalTask.title,
      date: originalTask.subtitle,
      category: originalTask.category,
    } as Task);
    setEditOpen(true);
  };

  const activeSection = sections.find((s) => s.type === tab.toLowerCase() as any);
  const tasks = activeSection?.tasks ?? [];
  const highPriorityTasks = tasks.slice(0, 3);
  const otherTasks = tasks.slice(3);

  const today = getToday();

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
              aria-label={`Show ${tabName.toLowerCase()} tasks`}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${
                  tab === tabName
                    ? "bg-gradient-hero text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
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
            {tasks.length === 0 ? (
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
                    <Body className="text-sm font-semibold text-foreground">
                      High Priority
                    </Body>

                    {highPriorityTasks.map((task) => (
                      <ListItemCard
                        key={task.id}
                        variant="solid"
                      >
                        <TaskRow
                          task={task}
                          onToggleTask={(id) => toggleTask(id, today)}
                          onSelectTask={handleSelectTask}
                        />
                      </ListItemCard>
                    ))}
                  </div>
                )}

                {otherTasks.length > 0 && (
                  <div className="space-y-2 mt-2">
                    <Body className="text-sm font-semibold text-foreground">
                      Other Tasks
                    </Body>

                    {otherTasks.map((task) => (
                      <ListItemCard
                        key={task.id}
                        variant="solid"
                      >
                        <TaskRow
                          task={task}
                          onToggleTask={(id) => toggleTask(id, today)}
                          onSelectTask={handleSelectTask}
                        />
                      </ListItemCard>
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
          aria-label="Add new task"
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