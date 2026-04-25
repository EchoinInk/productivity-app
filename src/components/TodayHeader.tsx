import { ChevronLeft, ChevronRight, Menu, Bell } from "lucide-react";
import { UIText } from "@/components/ui/Text";

interface TodayHeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const TodayHeader = ({ selectedDate, onDateChange }: TodayHeaderProps) => {
  const shift = (days: number) => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + days);
    onDateChange(next);
  };

  return (
    <header className="pt-6 space-y-4">
      {/* TOP BAR */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label="Open menu"
          className="p-1.5 -ml-1.5 text-muted-foreground"
        >
          <Menu size={22} />
        </button>

        <UIText.HeadingL>Today</UIText.HeadingL>

        <button
          type="button"
          aria-label="Open notifications"
          className="p-1.5 -mr-1.5 text-muted-foreground"
        >
          <Bell size={22} />
        </button>
      </div>

      {/* DATE PILL */}
      <div className="flex items-center gap-2 px-4 rounded-full bg-muted/90 backdrop-blur-md shadow-[0_var(--space-2)_var(--space-5)_rgba(0,0,0,0.06)]">
        <button
          type="button"
          aria-label="Show previous day"
          onClick={() => shift(-1)}
          className="text-muted-foreground active:scale-95 transition"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex-1 text-center">
          <UIText.LabelSoft className="font-bold">
            {formatDate(selectedDate)}
          </UIText.LabelSoft>
        </div>

        <button
          type="button"
          aria-label="Show next day"
          onClick={() => shift(1)}
          className="text-muted-foreground active:scale-95 transition"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </header>
  );
};

export default TodayHeader;
