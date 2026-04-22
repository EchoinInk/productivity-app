import clsx from "clsx";
import ListItem from "@/components/ListItem";
import { formatTaskDateTime } from "@/shared/lib/date";
import { isTaskCompletedOn } from "@/features/tasks/selectors/taskSelectors";
import type { Task } from "@/features/tasks/types";

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

const TaskSection = ({ id, title, isOpen, onToggle, items, activeDate, onToggleTask, onSelectTask }: TaskSectionProps) => (
  <section className="space-y-2">
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={id}
      onClick={onToggle}
      className="flex items-center justify-between w-full rounded-md py-1 text-left transition active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <span className="text-xs text-muted-foreground" aria-hidden="true">{isOpen ? "▼" : "▶"}</span>
    </button>
    {isOpen && (
      <div id={id} className="space-y-1 animate-in fade-in duration-150">
        {items.length === 0 ? (
          <p className="text-xs text-muted-foreground px-1">No tasks</p>
        ) : (
          items.map((task) => {
            const done = isTaskCompletedOn(task, activeDate);
            const subtitle = [task.notes, formatTaskDateTime(task.date, task.time)].filter(Boolean).join(" • ");
            return (
              <div key={task.id} className={clsx("transition-opacity", done && "opacity-60")}>
                <ListItem
                  label={task.label}
                  subtitle={subtitle}
                  category={task.category}
                  checked={done}
                  onToggle={() => onToggleTask(task)}
                  onClick={() => onSelectTask(task)}
                />
              </div>
            );
          })
        )}
      </div>
    )}
  </section>
);

export default TaskSection;
