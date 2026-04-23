import { ChevronLeft, ChevronRight, Menu, Bell } from "lucide-react";

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
    <header className="pt-6 pb-2">
      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-5">
        <button className="p-1.5 -ml-1.5 text-foreground/70">
          <Menu size={22} />
        </button>

        <h1 className="text-base font-semibold">Today</h1>

        <button className="p-1.5 -mr-1.5 text-foreground/70">
          <Bell size={22} />
        </button>
      </div>

      {/* DATE PILL */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-muted/60 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <button
          onClick={() => shift(-1)}
          className="text-foreground/70 active:scale-95 transition"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex-1 text-center text-sm font-semibold text-foreground">
          {formatDate(selectedDate)}
        </div>

        <button
          onClick={() => shift(1)}
          className="text-foreground/70 active:scale-95 transition"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </header>
  );
};

export default TodayHeader;