import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import AddTask from "@/features/tasks/components/AddTaskModal";
import EditTask from "@/features/tasks/components/EditTaskModal";

import { getToday } from "@/shared/lib/date";

import { TaskListContainer } from "@/features/tasks/containers/TaskListContainer";
import TasksHeroCard from "@/features/tasks/components/TasksHeroCard";
import { useTaskActions } from "@/features/tasks/hooks/useTaskActions";
import { selectTaskProgress } from "@/features/tasks/selectors/taskSelectors";
import { getCategorySummaries } from "@/features/tasks/api";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { selectTasks } from "@/features/tasks/api";

import type { Task } from "@/features/tasks/types";

const TasksPage = () => {
  const { addTask, updateTask, deleteTask } = useTaskActions();
  const tasks = useTasksStore(selectTasks);

  const today = getToday();

  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleSelectTask = (id: string) => {
    const task = useTasksStore.getState().tasks.find(task => String(task.id) === id) ?? null;
    if (!task) return;
    setSelectedTask(task);
    setEditOpen(true);
  };

  const progress = useTasksStore(selectTaskProgress(today));
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
