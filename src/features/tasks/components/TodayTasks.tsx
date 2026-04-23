import { useState } from "react";
import TaskSection from "./TaskSection";
import type { Task } from "@/features/tasks/types";

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
  const [openSections, setOpenSections] = useState({
    today: true,
    upcoming: true,
    yesterday: true,
  });

  const toggle = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const sections = [
    { key: "today", title: "Today", items: timeline.today },
    { key: "upcoming", title: "Upcoming", items: timeline.upcoming },
    { key: "yesterday", title: "Yesterday", items: timeline.yesterday },
  ] as const;

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <TaskSection
          key={section.key}
          id={section.key}
          title={section.title}
          isOpen={openSections[section.key]}
          onToggle={() => toggle(section.key)}
          items={section.items}
          activeDate={activeDate}
          onToggleTask={onToggleTask}
          onSelectTask={() => {}}
        />
      ))}
    </div>
  );
};

export default TodayTasks;