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
      <div className="flex items-center justify-between mb-5">
        <button className="p-1.5 -ml-1.5 text-foreground/70">
          <Menu size={22} />
        </button>

        <h1 className="text-[26px] font-bold">Today</h1>

        <button className="p-1.5 -mr-1.5 text-foreground/70">
          <Bell size={22} />
        </button>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-[#e5e7f6] to-[#ebe0f3]">
        <button onClick={() => shift(-1)}>
          <ChevronLeft size={18} />
        </button>

        <div className="flex-1 text-center text-sm font-semibold">{formatDate(selectedDate)}</div>

        <button onClick={() => shift(1)}>
          <ChevronRight size={18} />
        </button>
      </div>
    </header>
  );
};

export default TodayHeader;
