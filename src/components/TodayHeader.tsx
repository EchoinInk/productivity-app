import { ChevronLeft, ChevronRight, Menu, Bell } from "lucide-react";
import { useState } from "react";

interface TodayHeaderProps {
  onDateClick?: () => void;
}

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const TodayHeader = ({ onDateClick }: TodayHeaderProps) => {
  const [date, setDate] = useState(new Date());

  const shift = (days: number) => {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    setDate(next);
  };

  return (
    <header className="pt-6 pb-2">
      <div className="flex items-center justify-between mb-5">
        <button className="p-1.5 -ml-1.5 text-foreground/70" aria-label="Menu">
          <Menu size={22} strokeWidth={2.2} />
        </button>
        <h1 className="text-[26px] font-bold tracking-tight text-foreground">
          Today
        </h1>
        <button className="p-1.5 -mr-1.5 text-foreground/70" aria-label="Notifications">
          <Bell size={22} strokeWidth={2.2} />
        </button>
      </div>

      <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full px-3 py-2 shadow-[0_2px_10px_rgba(80,80,120,0.05)]">
        <button
          onClick={() => shift(-1)}
          className="w-7 h-7 rounded-full flex items-center justify-center text-foreground/50 hover:bg-white/60"
          aria-label="Previous day"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={onDateClick}
          className="flex-1 text-center text-sm font-semibold text-foreground/80"
        >
          {formatDate(date)}
        </button>
        <button
          onClick={() => shift(1)}
          className="w-7 h-7 rounded-full flex items-center justify-center text-foreground/50 hover:bg-white/60"
          aria-label="Next day"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </header>
  );
};

export default TodayHeader;
