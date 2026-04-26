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
      ? "Nothing left on your list 🤍"
      : `${remaining} task${remaining === 1 ? "" : "s"} to go. Small steps, big results ✨`;

  return (
   <Card
  variant="hero"
  className="h-44"   // ~176px tall, matches your bottom card
>
  <div className="flex items-center gap-4 p-4 h-full">

    {/* LEFT — Progress Ring */}
    <div className="bg-white/20 p-3 rounded-full shrink-0">
      <div className="relative">
        <svg height={64} width={64}>
          {/* circles unchanged */}
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <UIText.Heading className="text-white">
            {percentage}%
          </UIText.Heading>
        </div>
      </div>
    </div>

    {/* CENTER — Text */}
    <div className="flex flex-col gap-1 flex-1 min-w-0">
      <UIText.HeroTitle className="text-white">
        Today’s Tasks
      </UIText.HeroTitle>

      <UIText.HeroSubtext className="text-white/90">
        {completed} of {total} completed
      </UIText.HeroSubtext>

      <UIText.HeroSupport className="text-white/75">
        {motivation}
      </UIText.HeroSupport>
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
