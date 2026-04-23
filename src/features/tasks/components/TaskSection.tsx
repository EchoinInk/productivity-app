import { TaskRow } from "./TaskRow";
import type { Task } from "@/features/tasks/types";
import EmptyState from "@/components/ui/EmptyState";

interface TaskSectionProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  items: Task[];
  activeDate: string;
  onToggleTask: (task: Task) => void;
  onSelectTask: (task: Task) => void;
}

const TaskSection = ({
  id,
  title,
  isOpen,
  onToggle,
  items,
  activeDate,
  onToggleTask,
  onSelectTask,
}: TaskSectionProps) => (
  <section className="space-y-2">
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={id}
      onClick={onToggle}
      className="flex items-center justify-between w-full rounded-md py-1 text-left transition active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <span className="text-xs text-muted-foreground" aria-hidden="true">
        {isOpen ? "▼" : "▶"}
      </span>
    </button>

    {isOpen && (
      <div id={id} className="space-y-1 animate-in fade-in duration-150">
        {items.length === 0 ? (
<EmptyState
  title="No tasks"
  description="You're all caught up for this section"
/>
        ) : (
          items.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              activeDate={activeDate}
              onToggleTask={onToggleTask}
              onSelectTask={onSelectTask}
            />
          ))
        )}
      </div>
    )}
  </section>
);

export default TaskSection;