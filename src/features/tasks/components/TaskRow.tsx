import { memo } from "react";
import { TaskRowUI } from "@/features/tasks/components/ui/TaskRowUI";

export type TaskRowVM = {
  id: string;
  title: string;
  subtitle: string;
  isCompleted: boolean;
  category: string | null;
};

type Props = TaskRowVM & {
  onToggleTask: (id: string) => void;
  onSelectTask: (id: string) => void;
};

export const TaskRow = memo(
  ({ id, title, subtitle, isCompleted, category, onToggleTask, onSelectTask }: Props) => {
    return (
      <TaskRowUI
        id={id}
        title={title}
        subtitle={subtitle}
        isCompleted={isCompleted}
        category={category}
        onToggleTask={() => onToggleTask(id)}
        onSelectTask={() => onSelectTask(id)}
      />
    );
  }
);

TaskRow.displayName = "TaskRow";