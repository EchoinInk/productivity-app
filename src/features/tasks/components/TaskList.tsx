import type { Task } from "@/features/tasks/types";
import { TaskRow } from "./TaskRow";

interface TaskListProps {
  items: Task[];
  activeDate: string;
  onToggleTask: (task: Task) => void;
  onSelectTask: (task: Task) => void;
}

const TaskList = ({
  items,
  activeDate,
  onToggleTask,
  onSelectTask,
}: TaskListProps) => {
  return (
    <div className="space-y-1">
      {items.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          activeDate={activeDate}
          onToggleTask={onToggleTask}
          onSelectTask={onSelectTask}
        />
      ))}
    </div>
  );
};

export default TaskList;