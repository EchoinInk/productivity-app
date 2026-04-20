import { useAppStore } from "@/store/useAppStore";
import { cardSoft } from "@/lib/theme";
import clsx from "clsx";

interface Props {
  selectedDate: string;
}

const TaskProgressCard = ({ selectedDate }: Props) => {
  const tasks = useAppStore((s) => s.tasks);

  const todayTasks = tasks.filter((t) => t.date === selectedDate);

  const total = todayTasks.length;

  const completed = todayTasks.filter((t) =>
    t.completedDates.includes(selectedDate)
  ).length;

  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div
      className={clsx(
        "p-5 rounded-2xl text-white",
        "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 shadow-lg"
      )}
    >
      <div className="flex items-center justify-between">
        {/* LEFT: PROGRESS CIRCLE (simple version) */}
        <div className="text-3xl font-bold">
          {percentage}%
        </div>

        {/* RIGHT: TEXT */}
        <div className="text-right">
          <p className="text-sm opacity-90">Progress</p>
          <p className="text-lg font-semibold">Today Tasks</p>
          <p className="text-xs opacity-80 mt-1">
            {completed} / {total} completed
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskProgressCard;
