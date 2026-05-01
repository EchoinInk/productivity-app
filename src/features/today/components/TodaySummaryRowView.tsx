import { ChevronRight } from "lucide-react";

interface TodaySummaryRowViewProps {
  remaining: number;
  billsLabel: string;
  onClick: () => void;
}

export const TodaySummaryRowView = ({
  remaining,
  billsLabel,
  onClick,
}: TodaySummaryRowViewProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-muted/30 active:opacity-70 transition"
      aria-label="View budget and bills summary"
    >
      <div className="flex items-baseline gap-2 min-w-0 text-sm">
        <span className="font-semibold text-primary">${remaining}</span>

        <span className="text-muted-foreground">left</span>

        <span className="text-muted-foreground">•</span>

        <span className="text-muted-foreground truncate">
          {billsLabel}
        </span>
      </div>

      <ChevronRight
        size={18}
        className="text-muted-foreground shrink-0"
      />
    </button>
  );
};
