import { Bell, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { UIText } from "@/components/ui/Text";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
  onBack?: () => void;
  showDatePill?: boolean;
  showTopBar?: boolean;
}

const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const Header = ({ 
  title, 
  subtitle, 
  selectedDate, 
  onDateChange, 
  onBack,
  showDatePill = false,
  showTopBar = false 
}: HeaderProps) => {
  const shift = (days: number) => {
    if (!selectedDate || !onDateChange) return;
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + days);
    onDateChange(next);
  };

  return (
    <header className="pt-6 space-y-4">
      {/* TOP BAR — menu · greeting · notifications */}
      {showTopBar && (
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            aria-label="Open menu"
            className="p-2 -ml-2 text-foreground active:scale-95 transition"
          >
            <Menu size={22} />
          </button>

          <div className="flex-1 text-center">
            <UIText.HeadingL>Hi, Alex</UIText.HeadingL>
            <UIText.Meta>Let's get things done</UIText.Meta>
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="p-2 -mr-2 text-foreground active:scale-95 transition relative"
          >
            <Bell size={22} />
            <span
              aria-hidden
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"
            />
          </button>
        </div>
      )}

      {/* TITLE OR DATE PILL */}
      {showDatePill && selectedDate && onDateChange ? (
        <div className="flex items-center gap-2 px-4 rounded-full bg-muted/90 backdrop-blur-md shadow-[0_var(--space-2)_var(--space-5)_rgba(0,0,0,0.06)]">
          <button
            type="button"
            aria-label="Show previous day"
            onClick={() => shift(-1)}
            className="p-2 text-muted-foreground active:scale-95 transition"
          >
            <ChevronLeft size={20} />
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
            className="p-2 text-muted-foreground active:scale-95 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      ) : title ? (
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            {onBack && (
              <button
                onClick={onBack}
                className="absolute left-0 p-2 rounded-lg hover:bg-muted/40 active:scale-[0.98] transition-all"
                aria-label="Go back"
              >
                ←
              </button>
            )}
            <UIText.HeadingXL>{title}</UIText.HeadingXL>
          </div>

          {subtitle && (
            <div className="rounded-full px-4 py-2 text-center backdrop-blur-xl bg-gradient-date-pill shadow-[inset_0_1px_var(--space-1)_hsl(0_0%_100%/0.6),0_var(--space-2)_20px_hsl(220_20%_10%/0.05)]">
              <UIText.Meta>{subtitle}</UIText.Meta>
            </div>
          )}
        </div>
      ) : null}
    </header>
  );
};

export default Header;
