import { useAppStore } from "@/store/useAppStore";
import { cardSoft } from "@/lib/theme";
import { gradientPrimaryCss } from "@/lib/gradients";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface Props {
  selectedDate: string;
}

const TaskProgressCard = ({ selectedDate }: Props) => {
  const tasks = useAppStore((s) => s.tasks);

  const todayTasks = tasks.filter((t) => t.date === selectedDate);

  const total = todayTasks.length;

  const completed = todayTasks.filter((t) => t.completedDates.includes(selectedDate)).length;

  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  // 🔥 SVG CALCULATIONS
  const radius = 42;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = percentage;

    if (start === end) return;

    const duration = 500; // ms (adjust feel here)
    const incrementTime = 16; // ~60fps
    const step = (end - start) / (duration / incrementTime);

    const timer = setInterval(() => {
      start += step;

      if (start >= end) {
        setDisplayPercent(end);
        clearInterval(timer);
      } else {
        setDisplayPercent(Math.round(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [percentage]);

  return (
    <div
      className={clsx("p-5 rounded-2xl text-white", "shadow-[0_3px_12px_rgba(120,110,200,0.42)] rounded-2xl")}
      style={{ background: gradientPrimaryCss }}
    >
      <div className="flex items-center justify-between">
        {/* 🔵 CIRCULAR PROGRESS */}
        <div className="relative w-24 h-24">
          <svg height={radius * 2} width={radius * 2}>
            {/* Background circle */}
            <circle
              stroke="rgba(255,255,255,0.2)"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />

            {/* Progress circle */}
            <circle
              stroke="white"
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={`${circumference} ${circumference}`}
              style={{
                strokeDashoffset,
                transition: "stroke-dashoffset 0.4s ease",
              }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              transform={`rotate(-90 ${radius} ${radius})`}
            />
          </svg>

          {/* CENTER TEXT */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold leading-none flex items-center justify-center">
              {displayPercent}%
            </span>
          </div>
        </div>

        {/* TEXT SIDE */}
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
