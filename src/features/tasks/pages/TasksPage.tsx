import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import { AddTaskModal, EditTaskModal } from "@/features/tasks";

import { getToday } from "@/shared/lib/date";

import { TaskListContainer } from "@/features/tasks/components/TaskListContainer";
import TasksHeroCard from "@/features/tasks/components/TasksHeroCard";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { getCategorySummaries } from "@/features/tasks/api";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";

import type { Task } from "@/features/tasks/types/types";

const TasksPage = () => {
  const { actions, progress } = useTasks();
  const { addTask, updateTask, deleteTask } = actions;
  const tasks = useTasksStore((state) => state.tasks);

  const today = getToday();

  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleSelectTask = (id: string) => {
    const task = tasks.find(t => String(t.id) === id) ?? null;
    if (!task) return;
    setSelectedTask(task);
    setEditOpen(true);
  };

  const categories = getCategorySummaries(tasks, today);

  return (
    <>
      <div className="space-y-4">
        <Header title="Tasks" />

        <TasksHeroCard
          percentage={progress.percentage}
          total={progress.total}
          completed={progress.completed}
          categories={categories}
          onAddTask={() => setOpen(true)}
          onCategoryClick={() => {}}
        />

        <TaskListContainer onSelectTask={handleSelectTask} />

        <div className="pt-2">
          <Button fullWidth onClick={() => setOpen(true)}>
            <Plus size={16} /> Add Task
          </Button>
        </div>
      </div>

      <AddTaskModal
        open={open}
        onClose={() => setOpen(false)}
        defaultDate={today}
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
