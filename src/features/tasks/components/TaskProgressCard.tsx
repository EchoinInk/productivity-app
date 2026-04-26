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
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  const remaining = Math.max(0, total - completed);

  const motivation =
    remaining === 0
      ? "All done 🎉 Enjoy your day!"
      : `${remaining} task${
          remaining === 1 ? "" : "s"
        } to go. You've got this 💪`;

  return (
    <Card
      variant="hero"
      size="lg"
      style={{
        filter: "saturate(1.25) contrast(1.1)",
      }}
    >
      <Card.Body layout="between" size="lg">
        
        {/* LEFT — progress ring */}
        <div className="bg-white/20 p-3 rounded-full shrink-0">
          <div className="relative">
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
              <UIText.Heading className="text-white">
                {percentage}%
              </UIText.Heading>
            </div>
          </div>
        </div>

        {/* CENTER — text + CTA */}
        <div className="flex-1 min-w-0 space-y-2">
          <UIText.HeroTitle className="text-white">
            Today’s Tasks
          </UIText.HeroTitle>

          <UIText.HeroSubtext className="text-white/90">
            {completed} of {total} completed
          </UIText.HeroSubtext>

          <UIText.HeroSupport className="text-white/75">
            {motivation}
          </UIText.HeroSupport>

          <Card.Action align="left">
            <button className="mt-2 bg-white text-primary px-4 py-2 rounded-full shadow-md transition hover:scale-[1.02] active:scale-[0.98]">
              <UIText.CTA>Start a Task →</UIText.CTA>
            </button>
          </Card.Action>
        </div>

        {/* RIGHT — illustration */}
        <img
          src={clipboardIllustration}
          alt=""
          aria-hidden
          className="object-contain shrink-0 drop-shadow-soft"
          style={{ width: "5.5rem", height: "5.5rem" }}
        />
      </Card.Body>
    </Card>
  );
};

export default TaskProgressCard;