import { Card } from "@/components/ui/Card";
import { UIText } from "@/components/ui/Text";
import { semanticColors } from "@/theme";
import clipboardIllustration from "@/assets/3d-clipboard.png";

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

  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card variant="primary">
      <div className="flex items-center justify-between gap-3">
        {/* LEFT — progress ring */}
        <div className="relative shrink-0">
          <svg height={radius * 2} width={radius * 2}>
            <circle
              stroke="var(--progress-track)"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />

            <circle
              stroke={semanticColors.softText}
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
            <UIText.LabelSoft>{percentage}%</UIText.LabelSoft>
          </div>
        </div>

        {/* MIDDLE — text */}
        <div className="flex-1 text-right space-y-0.5">
          <UIText.Meta style={{ color: semanticColors.softText }}>Progress</UIText.Meta>

          <UIText.HeadingL style={{ color: semanticColors.softText }}>Today Tasks</UIText.HeadingL>

          <UIText.Meta style={{ color: semanticColors.softText }}>
            {completed} / {total} completed
          </UIText.Meta>
        </div>

        {/* RIGHT — decorative illustration */}
        <img
          src={clipboardIllustration}
          alt=""
          aria-hidden
          className="w-15 h-15 object-contain shrink-0 drop-shadow-soft"
          style={{ width: "6.5rem", height: "6.5rem" }}
        />
      </div>
    </Card>
  );
};

export default TaskProgressCard;
