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
        className="rounded-2xl px-5 py-5 shadow-[0_3px_12px_rgba(120,110,200,0.42)]"
        style={{ background: gradientPrimaryCss }}
      >
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white drop-shadow-[0_1px_3px_rgba(150,140,220,0.45)] leading-none">
            ${remaining}
          </span>
          <span className="text-white text-sm font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
            left to spend
          </span>{" "}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="text-sm text-foreground/70">
          <span className="font-semibold text-foreground">${spent}</span> Spent
        </p>
      </div>
    </section>
  );
};

export default MoneyLeftCard;
