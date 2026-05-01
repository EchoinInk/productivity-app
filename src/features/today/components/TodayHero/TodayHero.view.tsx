import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Heading, HeroTitle, HeroSubtext, HeroSupport, CTA } from "@/components/ui/Text";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import { buttonVariants } from "@/components/ui/buttonVariants";
import clipboardIllustration from "@/assets/3d-clipboard.webp";

export interface TodayHeroViewModel {
  percentage: number;
  total: number;
  remaining: number;
  progressText: string;
  motivation: string | null;
  status: "on track" | "behind" | "ahead";
  onAddTask?: () => void;
  isLoading?: boolean;
}

export const TodayHeroView = ({ model }: { model: TodayHeroViewModel }) => {
  const { percentage, total, remaining, progressText, motivation, onAddTask, isLoading = false } = model;

  const radius = 36;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card variant="hero" className="overflow-hidden p-0 shadow-pop">
      <div className="flex items-center gap-4 px-6 py-10">

        {/* Progress ring */}
        <div className="relative shrink-0 h-[104px] w-[104px]">
          <svg viewBox="0 0 72 72" className="w-full h-full">
            <circle
              stroke="currentColor"
              className="text-primary-foreground/40"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="currentColor"
              className="text-primary-foreground origin-center -rotate-90 transition-[stroke-dashoffset] duration-500 ease-out"
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
            <Heading className="text-primary-foreground text-shadow-soft text-lg">
              {percentage}%
            </Heading>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">

          <HeroTitle className="text-primary-foreground text-shadow-soft">
            Today's Focus
          </HeroTitle>

          <HeroSubtext className="text-primary-foreground/80">
            {progressText}
          </HeroSubtext>

          {motivation && (
            <HeroSupport className="text-primary-foreground/75">
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
              className={`
                mt-2
                px-4 py-2
                rounded-full
                ${buttonVariants.secondary}
                border border-border/30
                shadow-cta
                active:scale-[0.97]
                transition
                flex items-center gap-1
                w-fit
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/80
              `}
            >
              <CTA className="text-foreground flex items-center gap-1 tracking-tight">
                Add a task
                <ArrowRight size={12} className="opacity-70" />
              </CTA>
            </button>
          ) : (
            <span className="mt-2 px-3 py-1 rounded-full bg-primary-foreground/20 text-primary-foreground text-xs font-medium w-fit">
              {remaining === 0
                ? "All done 🎉"
                : remaining === 1
                ? "1 task left"
                : `${remaining} tasks left`}
            </span>
          )}
        </div>

        {/* Illustration */}
        <img
          src={clipboardIllustration}
          alt=""
          aria-hidden
          loading="eager"
          fetchPriority="high"
          width={80}
          height={80}
          className="
            hidden sm:block
            w-[80px] h-[80px]
            object-contain
            shrink-0
            opacity-90
          "
        />

      </div>
    </Card>
  );
};
