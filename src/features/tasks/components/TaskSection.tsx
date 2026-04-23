import type { Task } from "@/features/tasks/types";
import EmptyState from "@/components/ui/EmptyState";
import TaskList from "./TaskList";
import { UIText } from "@/components/ui/Text";
import { ChevronDown, ChevronRight } from "lucide-react";

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
}: TaskSectionProps) => {
  return (
    <section className="space-y-3">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={onToggle}
        className="
          flex items-center justify-between w-full
          py-1 text-left
          transition active:scale-[0.98]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        "
      >
        <UIText.Section>{title}</UIText.Section>

        <span className="text-muted-foreground">
          {isOpen ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </span>
      </button>

      {isOpen && (
        <div id={id} className="animate-in fade-in duration-150">
          {items.length === 0 ? (
            <EmptyState
              title="No tasks"
              description="You're all caught up for this section"
              className="py-6"
            />
          ) : (
            <TaskList
              items={items}
              activeDate={activeDate}
              onToggleTask={onToggleTask}
              onSelectTask={onSelectTask}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default TaskSection;