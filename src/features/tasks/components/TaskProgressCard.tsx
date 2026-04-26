import { Card } from "@/components/ui/Card";
import { UIText } from "@/components/ui/Text";
import clipboardIllustration from "@/assets/3d-clipboard.png";

interface Props {
  percentage: number;
  total: number;
  completed: number;
  onAddTask?: () => void; // ✅ added
}

const TaskProgressCard = ({
  percentage,
  total,
  completed,
  onAddTask,
}: Props) => {
  const radius = 36;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  const remaining = Math.max(0, total - completed);

  // --- TEXT LOGIC ---
  const progressText =
    total === 0
      ? "No tasks today"
      : `${completed} of ${total} completed`;

  const motivation =
    total === 0
      ? null
      : remaining === 0
      ? "Nothing left on your list 🩶"
      : "You’re making progress ✨";

  return (
    <Card
      variant="hero"
      className="h-40"
      style={{ filter: "saturate(1.25) contrast(1.1)" }}
    >
      <Card.Body layout="between" size="md" className="h-full">
        
        {/* LEFT — Progress Ring */}
        <div className="relative shrink-0 h-[84px] w-[84px]">
          <div className="absolute inset-0 rounded-full bg-white/20" />

          <svg viewBox="0 0 72 72" className="w-full h-full relative">
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
              }}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <UIText.Heading className="text-white">
              {percentage}%
            </UIText.Heading>
          </div>
        </div>

        {/* CENTER — Text + CTA */}
        <div className="flex flex-col gap-1 flex-1 min-w-0 -mt-1">
          <UIText.HeroTitle className="text-white">
            Today’s Tasks
          </UIText.HeroTitle>

          <UIText.HeroSubtext className="text-white/90">
            {progressText}
          </UIText.HeroSubtext>

          {total === 0 ? (
            <Card.Action align="left">
              <button
                onClick={onAddTask}
                className="mt-1 px-9 py-1.5 rounded-full bg-white/70 text-[12px] font-medium shadow-sm shadow-black/10 hover:bg-white transition active:scale-[0.98] text-[#7C8BC4]"
              >
                Add a task →
              </button>
            </Card.Action>
          ) : (
            <UIText.HeroSupport className="text-white/80 mt-1">
              {motivation}
            </UIText.HeroSupport>
          )}
        </div>

        {/* RIGHT — Illustration */}
        <img
          src={clipboardIllustration}
          alt=""
          aria-hidden
          className="w-20 h-20 shrink-0 object-contain drop-shadow-soft"
        />
      </Card.Body>
    </Card>
  );
};

export default TaskProgressCard;