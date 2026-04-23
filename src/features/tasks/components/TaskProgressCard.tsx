import clsx from "clsx";
import { gradientPrimaryCss } from "@/lib/gradients";
import { Card } from "@/components/ui/Card";

interface Props {
  percentage: number;
  total: number;
  completed: number;
}

const TaskProgressCard = ({ percentage, total, completed }: Props) => {
  const radius = 36;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <Card
  className="p-4 text-white"
  style={{
    background: gradientPrimaryCss,
    filter: "saturate(1.1) contrast(1.05)",
  }}
>
      <div className="flex items-center justify-between">
        {/* LEFT — PROGRESS RING */}
        <div className="relative">
          <svg height={radius * 2} width={radius * 2}>
            <circle
              stroke="rgba(255,255,255,0.2)"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />

            <circle
              stroke="white"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
                transition: "stroke-dashoffset 0.3s ease",
              }}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {percentage}%
            </span>
          </div>
        </div>

        {/* RIGHT — TEXT */}
        <div className="text-right text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
          <p className="text-xs opacity-80">Progress</p>
          <p className="text-base font-semibold leading-tight">
            Today Tasks
          </p>
          <p className="text-sm">
            {completed} / {total} completed
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskProgressCard;