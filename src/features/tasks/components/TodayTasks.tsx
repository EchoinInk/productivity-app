import TaskSection from "./TaskSection";
import type { Task } from "@/features/tasks/types";
import TaskList from "./TaskList";

interface Timeline {
  today: Task[];
  upcoming: Task[];
  yesterday: Task[];
}

interface TodayTasksProps {
  timeline: Timeline;
  activeDate: string;
  onToggleTask: (task: Task) => void;
}

const TodayTasks = ({
  timeline,
  activeDate,
  onToggleTask,
}: TodayTasksProps) => {
  return (
    <div className="space-y-4">
      <TaskSection
        id="today"
        title="Today"
        isOpen
        onToggle={() => {}}
        items={timeline.today}
        activeDate={activeDate}
        onToggleTask={onToggleTask}
        onSelectTask={() => {}}
      />

      <TaskSection
        id="upcoming"
        title="Upcoming"
        isOpen
        onToggle={() => {}}
        items={timeline.upcoming}
        activeDate={activeDate}
        onToggleTask={onToggleTask}
        onSelectTask={() => {}}
      />

      <TaskSection
        id="yesterday"
        title="Yesterday"
        isOpen
        onToggle={() => {}}
        items={timeline.yesterday}
        activeDate={activeDate}
        onToggleTask={onToggleTask}
        onSelectTask={() => {}}
      />
    </div>
  );
};

export default TodayTasks;