import { useState } from "react";
import type { Task } from "../types/types";
import { TaskRowNew } from "./TaskRowNew";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  selectIncompleteTasks,
  selectCompletedTasks,
} from "../selectors/taskSelectors";

interface Props {
  todayTasks: Task[];
  upcomingTasks: Task[];
  completedTasks: Task[];
  onToggle: (id: string) => void;
}

export const TaskSections = ({ todayTasks, upcomingTasks, completedTasks, onToggle }: Props) => {
  const [completedExpanded, setCompletedExpanded] = useState(false);

  const todayIncomplete = selectIncompleteTasks(todayTasks);
  const todayCompleted = selectCompletedTasks(todayTasks);

  return (
    <div className="space-y-4">
      
      {/* Today Section */}
      {todayIncomplete.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground px-3">Today</h3>
          <div className="space-y-1">
            {todayIncomplete.map((task) => (
              <TaskRowNew key={task.id} task={task} onToggle={onToggle} />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Section */}
      {upcomingTasks.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted px-3">Upcoming</h3>
          <div className="space-y-1">
            {upcomingTasks.map((task) => (
              <TaskRowNew key={task.id} task={task} onToggle={onToggle} />
            ))}
          </div>
        </div>
      )}

      {/* Completed Section */}
      {(todayCompleted.length > 0 || completedTasks.length > 0) && (
        <div className="space-y-2">
          <button
            onClick={() => setCompletedExpanded(!completedExpanded)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-muted hover:text-foreground transition-colors"
          >
            {completedExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            Completed ({todayCompleted.length + completedTasks.length})
          </button>
          
          {completedExpanded && (
            <div className="space-y-1">
              {todayCompleted.map((task) => (
                <TaskRowNew key={task.id} task={task} onToggle={onToggle} />
              ))}
              {completedTasks.map((task) => (
                <TaskRowNew key={task.id} task={task} onToggle={onToggle} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {todayIncomplete.length === 0 && upcomingTasks.length === 0 && (
        <div className="px-3 py-8 text-center">
          <p className="text-sm text-muted">No tasks for this day</p>
          <p className="text-xs text-muted mt-1">Add a task to get started</p>
        </div>
      )}
    </div>
  );
};
