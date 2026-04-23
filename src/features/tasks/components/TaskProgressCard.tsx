import clsx from "clsx";
import { gradientPrimaryCss } from "@/lib/gradients";

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
    <section
      className={clsx("rounded-2xl p-5 shadow-lg")}
      style={{ background: gradientPrimaryCss }} // ✅ SYSTEM
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
        <div className="text-right text-white">
          <p className="text-xs opacity-80">Progress</p>
          <p className="text-lg font-semibold leading-tight">
            Today Tasks
          </p>
          <p className="text-sm opacity-80">
            {completed} / {total} completed
          </p>
        </div>
      </div>
    </section>
  );
};

export default TaskProgressCard;