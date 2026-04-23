import { Card } from "@/components/ui/Card";
import { UIText } from "@/components/ui/Text";

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
    <Card variant="primary">
      <div className="flex items-center justify-between gap-3">
        {/* LEFT — PROGRESS RING */}
        <div className="relative">
          <svg height={radius * 2} width={radius * 2}>
            <circle
              stroke="rgba(255, 255, 255, 0.35)"
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
            <span className="text-white text-md font-semibold">
              {percentage}%
            </span>
          </div>
        </div>

        {/* RIGHT — TEXT */}
        <div className="text-right">
          <p className="text-xs">Progress</p>
          <h2 className="text-base font-semibold leading-tight">
            Today Tasks
          </h2>
          <p className="text-xs">
            {completed} / {total} completed
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskProgressCard;