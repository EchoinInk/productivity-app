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

  // --- TEXT LOGIC ---
  const progressText = total === 0 ? "No tasks today" : `${completed} of ${total} completed`;

  const motivation =
    total === 0
      ? null // CTA replaces this
      : remaining === 0
        ? "Nothing left on your list 🩶"
        : "You’re making progress ✨";

  return (
    <Card variant="hero" className="h-44">
      <div className="flex items-center gap-3 p-4 h-full">
        {/* LEFT — Progress Ring */}
<div className="bg-white/20 p-2 rounded-full shrink-0 flex items-center justify-center h-[80px] w-[80px]">
          <div className="relative flex items-center justify-center">
            <svg height={64} width={64}>
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
              <UIText.Heading className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.28)]">
                {percentage}%
              </UIText.Heading>
            </div>
          </div>
        </div>

        {/* CENTER — Text */}
        <div className="flex flex-col gap-1 flex-1 min-w-0 justify-start -mt-1">
          <UIText.HeroTitle className="text-white">Today’s Tasks</UIText.HeroTitle>

          <UIText.HeroSubtext className="text-white/90">{progressText}</UIText.HeroSubtext>

          {total === 0 ? (
            <button className="mt-1 px-3 py-1.5 rounded-full bg-white/70 text-[13px] font-medium shadow-sm shadow-black/10 hover:bg-white transition active:scale-[0.98] text-[#7C8BC4]">
              Add a task →
            </button>
          ) : (
            <UIText.HeroSupport className="text-white/80 mt-1">{motivation}</UIText.HeroSupport>
          )}
        </div>

        {/* RIGHT — Illustration */}
        <img
          src={clipboardIllustration}
          alt=""
          aria-hidden
          className="w-20 h-20 shrink-0 object-contain drop-shadow-soft"
        />
      </div>
    </Card>
  );
};

export default TaskProgressCard;
