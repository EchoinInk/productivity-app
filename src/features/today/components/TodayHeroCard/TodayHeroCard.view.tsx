import { Card } from "@/components/ui/Card";
import { Heading, HeroTitle, HeroSubtext, HeroSupport } from "@/components/ui/Text";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import clipboardIllustration from "@/assets/3d-clipboard.png";

export interface TodayHeroCardViewModel {
  percentage: number;
  total: number;
  remaining: number;
  progressText: string;
  motivation: string | null;
  onAddTask?: () => void;
  isLoading?: boolean;
}

export const TodayHeroCardView = ({ model }: { model: TodayHeroCardViewModel }) => {
  const { percentage, total, remaining, progressText, motivation, onAddTask, isLoading = false } = model;

  const radius = 36;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card variant="hero" className="overflow-hidden p-0">
      {/* TOP — gradient hero */}
      <div className="flex items-center gap-4 p-5">
        {/* Progress ring */}
        <div className="relative shrink-0 h-[84px] w-[84px]">
          <svg viewBox="0 0 72 72" className="w-full h-full">
            <circle
              stroke="currentColor"
              className="text-white/25"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="currentColor"
              className="text-white origin-center -rotate-90 transition-[stroke-dashoffset] duration-500 ease-out"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Heading className="text-white">{percentage}%</Heading>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <HeroTitle className="text-white">Today's Tasks</HeroTitle>
          <HeroSubtext className="text-white/90">{progressText}</HeroSubtext>
          {motivation && (
            <HeroSupport className="text-white/85 mt-0.5">
              {motivation}
            </HeroSupport>
          )}
          {/* CTA */}
          {isLoading ? (
            <Skeleton className="h-7 w-28 rounded-full mt-2" />
          ) : total === 0 ? (
            <button
              type="button"
              onClick={onAddTask}
              className="mt-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold hover:bg-white/30 active:scale-[0.98] transition"
            >
              + Add a task
            </button>
          ) : (
            <span className="mt-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
              {remaining === 0 ? "All done 🎉" : `${remaining} tasks left`}
            </span>
          )}
        </div>

        {/* Illustration */}
        <img
          src={clipboardIllustration}
          alt=""
          aria-hidden
          className="shrink-0 h-[104px] w-[104px] object-contain drop-shadow-[0_4px_10px_hsl(220_20%_10%/0.12)]"
        />
      </div>
    </Card>
  );
};
