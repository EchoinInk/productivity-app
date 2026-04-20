import { cardSoft } from "@/lib/theme";
import { gradientPrimaryCss } from "@/lib/gradients";
import clsx from "clsx";

interface MoneyLeftCardProps {
  remaining?: number;
  spent?: number;
  total?: number;
}

const MoneyLeftCard = ({ remaining = 120, spent = 35, total = 155 }: MoneyLeftCardProps) => {
  const pct = Math.min(1, spent / total);
  const dots = 4;

  return (
    <section className={clsx(cardSoft, "px-5 py-4")}>
      <h2 className="text-[16px] font-semibold text-foreground mb-3">Money Left This Week</h2>

      <div
        className="rounded-2xl px-5 py-5 shadow-[0_3px_10px_rgba(120,110,200,0.45)]"
        style={{ background: gradientPrimaryCss }}
      >
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white drop-shadow-lg leading-none">${remaining}</span>
          <span className="text-white/90 text-sm font-bold">left to spend</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="text-sm text-foreground/70">
          <span className="font-semibold text-foreground">${spent}</span> Spent
        </p>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: dots }).map((_, i) => {
            const filled = i / dots < pct;
            return (
              <span
                key={i}
                className={clsx("w-1.5 h-1.5 rounded-full", filled ? "bg-foreground/40" : "bg-foreground/15")}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MoneyLeftCard;
