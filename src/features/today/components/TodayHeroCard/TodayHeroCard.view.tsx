import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Heading, HeroTitle, HeroSubtext, HeroSupport, CTA } from "@/components/ui/Text";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import clipboardIllustration from "@/assets/3d-clipboard.webp";

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
  const navigate = useNavigate();

  const radius = 36;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card variant="hero" className="overflow-hidden p-0 shadow-pop">
      <div className="flex items-center gap-4 px-6 py-8">

        {/* Progress ring */}
        <div className="relative shrink-0 h-[96px] w-[96px]">
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
            Today's Tasks
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
              onClick={() => {
                if (onAddTask) {
                  onAddTask();
                } else {
                  navigate("/tasks");
                }
              }}
              className="
                mt-2
                px-4 py-2
                rounded-full
                bg-card/95
                border border-border/30
                shadow-cta
                active:scale-[0.97]
                transition
                flex items-center gap-1
                w-fit
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/80
              "
            >
              <CTA className="text-foreground flex items-center gap-1 tracking-tight">
                Add a task
                <ArrowRight size={11} className="opacity-50" />
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
  loading="lazy"
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
