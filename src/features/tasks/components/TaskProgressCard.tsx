import { Card } from "@/components/ui/Card";
import { UIText } from "@/components/ui/Text";
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

  const remaining = Math.max(0, total - completed);
  const motivation =
    remaining === 0
      ? "All done — enjoy your day!"
      : `${remaining} task${remaining === 1 ? "" : "s"} to go. You've got this.`;

  return (
    <Card variant="hero" size="lg">
      <div className="flex items-center gap-4">
        {/* LEFT — progress ring */}
        <div className="relative shrink-0">
          <svg height={radius * 2} width={radius * 2}>
            <circle
              stroke="rgba(255,255,255,0.25)"
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
            <UIText.Heading className="text-white">{percentage}%</UIText.Heading>
          </div>
        </div>

        {/* CENTER — text */}
        <div className="flex-1 min-w-0 space-y-1">
          <UIText.HeroTitle className="text-white">Today’s Tasks</UIText.HeroTitle>
          <UIText.HeroSubtext className="text-white">
            {completed} of {total} completed
          </UIText.HeroSubtext>
          <UIText.HeroSupport className="text-white">{motivation}</UIText.HeroSupport>
        </div>

        {/* RIGHT — illustration */}
        <img
          src={clipboardIllustration}
          alt=""
          aria-hidden
          className="object-contain shrink-0 drop-shadow-soft"
          style={{ width: "6.5rem", height: "6.5rem" }}
        />
      </div>
    </Card>
  );
};

export default TaskProgressCard;
