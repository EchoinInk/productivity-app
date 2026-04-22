import clsx from "clsx";
import { Card } from "@/shared/ui/Card";
import { useAppStore } from "@/store/useAppStore";
import { getTaskProgress } from "@/features/tasks/selectors/taskSelectors";

interface Props {
  selectedDate: string;
}

const TaskProgressCard = ({ selectedDate }: Props) => {
  const tasks = useAppStore((s) => s.tasks);
  const { total, completed, percentage } = getTaskProgress(tasks, selectedDate);

  const radius = 42;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card variant="primary" className={clsx("p-5 rounded-md text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.22)]")}>
      <div className="flex items-center justify-between">
        <div className="relative w-24 h-24">
          <svg viewBox={`0 0 ${radius * 2} ${radius * 2}`} className="w-full h-full" aria-hidden="true">
            <circle
              stroke="hsl(var(--primary-foreground) / 0.25)"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="hsl(var(--primary-foreground))"
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={`${circumference} ${circumference}`}
              style={{ strokeDashoffset, transition: "stroke-dashoffset 0.4s ease" }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              transform={`rotate(-90 ${radius} ${radius})`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg drop-shadows lg font-semibold leading-none">{percentage}%</span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[12px] opacity-90">Progress</p>
          <p className="text-lg drop-shadow lg font-semibold">Today Tasks</p>
          <p className="text-[11px] drop-shadow-md opacity-80 mt-1 italic tracking-[0.2px]">
            {completed} / {total} completed
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskProgressCard;
