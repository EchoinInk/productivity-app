import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "@/components/layout/Header";
import { Body } from "@/components/ui/Text";
import { ListItemCard } from "@/components/ui/ListItemCard";
import { AddTaskModal, EditTaskModal } from "@/features/tasks";
import { TaskRow } from "@/features/tasks/components/TaskRow";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { getToday } from "@/shared/lib/date";
import { selectCompletedTasks } from "@/features/tasks/selectors/taskSelectors";

import type { Task } from "@/features/tasks/types/types";

const TasksPage = () => {
  const { sections, actions } = useTasks();
  const { addTask, updateTask, deleteTask, toggleTask } = actions;
  const allTasks = useTasksStore((state) => state.tasks);

  const [tab, setTab] = useState<"Today" | "Yesterday" | "Earlier">("Today");
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleSelectTask = (id: string) => {
    const originalTask = allTasks.find(t => t.id === id);
    if (!originalTask) return;
    setSelectedTask(originalTask);
    setEditOpen(true);
  };

  // Group tasks by time periods
  const taskGroups = useMemo(() => {
    const today = getToday() || new Date().toISOString().split("T")[0]!;
    const yesterday = new Date(Date.parse(today));
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0]!;

    const todayTasks = sections.today;
    const yesterdayTasks = selectCompletedTasks(allTasks).filter(task => task.date === yesterdayStr);
    const earlierTasks = selectCompletedTasks(allTasks).filter(task => task.date < yesterdayStr);

    return {
      today: todayTasks,
      yesterday: yesterdayTasks,
      earlier: earlierTasks
    };
  }, [sections.today, allTasks]);

  const getTasksForTab = () => {
    switch (tab) {
      case "Today":
        return taskGroups.today;
      case "Yesterday":
        return taskGroups.yesterday;
      case "Earlier":
        return taskGroups.earlier;
      default:
        return [];
    }
  };

  const tasks = getTasksForTab();

  return (
    <>
      <div className="relative min-h-screen bg-white px-4 pt-4 pb-28 space-y-4">
        <Header title="Tasks" />

        {/* Tabs */}
        <div className="flex gap-2">
          {(["Today", "Yesterday", "Earlier"] as const).map((tabName) => (
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
              <div className="space-y-2">
                <Body className="text-sm font-semibold text-foreground mb-4">
                  {tab} ({tasks.length})
                </Body>
                {tasks.map((task) => (
                  <ListItemCard
                    key={task.id}
                    variant="solid"
                    className={task.completed ? "opacity-70" : ""}
                  >
                    <TaskRow
                      task={task}
                      onToggleTask={(id) => toggleTask(id)}
                      onSelectTask={handleSelectTask}
                    />
                  </ListItemCard>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Add Task Modal */}
        <AddTaskModal
          open={open}
          onClose={() => setOpen(false)}
          defaultDate={tab === "Today" ? (getToday() || new Date().toISOString().split("T")[0]!) : ""}
          onSave={(taskInput) => {
            addTask(taskInput);
            setOpen(false);
          }}
        />

        {/* Edit Task Modal */}
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
      </div>
    </>
  );
};

export default TasksPage;