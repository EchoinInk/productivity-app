import { Card } from "@/components/ui/Card";
import { UIText } from "@/components/ui/Text";

interface MoneyLeftCardProps {
  remaining?: number;
  spent?: number;
  weeklyBudget?: number;
}

const MoneyLeftCard = ({
  remaining = 120,
  spent = 35,
  weeklyBudget,
}: MoneyLeftCardProps) => {
  const budget = weeklyBudget ?? remaining + spent;
  const percent = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;

  return (
    <Card variant="data">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <UIText.Metric>${remaining}</UIText.Metric>
          <UIText.MetricLabel>left this week</UIText.MetricLabel>
          <UIText.BodyMuted className="mt-1">
            <span className="font-semibold text-foreground">${spent}</span> spent so far
          </UIText.BodyMuted>
        </div>

        {/* Right — progress indicator */}
        <div className="w-16 h-16 shrink-0 relative">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${(percent / 100) * 94.25} 94.25`}
              style={{ transition: "stroke-dasharray 0.3s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <UIText.Label>{percent}%</UIText.Label>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MoneyLeftCard;
