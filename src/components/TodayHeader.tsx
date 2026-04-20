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
    onDateChange(next); // ✅ send to parent
  };

  return (
    <header className="pt-6 pb-2">
      <div className="flex items-center justify-between mb-5">
        <button className="p-1.5 -ml-1.5 text-foreground/70">
          <Menu size={22} strokeWidth={2.2} />
        </button>

        <h1 className="text-[26px] font-bold tracking-tight text-foreground">Today</h1>

        <button className="p-1.5 -mr-1.5 text-foreground/70">
          <Bell size={22} strokeWidth={2.2} />
        </button>
      </div>

      <div
        className="flex items-center gap-2 px-3 py-2 rounded-full 
        bg-gradient-to-r from-[#e5e7f6] to-[#ebe0f3]
        backdrop-blur-md bg-white/60 
        shadow-[0_2px_10px_rgba(80,80,120,0.05)]"
      >
        <button
          onClick={() => shift(-1)}
          className="w-7 h-7 rounded-full flex items-center justify-center text-foreground/50 hover:bg-white/60"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex-1 text-center text-sm font-semibold text-foreground/80">{formatDate(selectedDate)}</div>

        <button
          onClick={() => shift(1)}
          className="w-7 h-7 rounded-full flex items-center justify-center text-foreground/50 hover:bg-white/60"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </header>
  );
};

export default TodayHeader;
