import { cardSoft } from "@/lib/theme";
import { gradientTertiaryCss } from "@/lib/gradients";
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
      <h2 className="text-lg font-semibold text-foreground mb-3">Money Left This Week</h2>

      <div
        className="rounded-2xl px-5 py-5 shadow-[0_3px_12px_rgba(120,110,200,0.42)]"
        style={{ background: gradientTertiaryCss }}
      >
        <div className="flex items-baseline gap-2">
          <span
            className="text-3xl font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.22)]
 leading-none"
          >
            ${remaining}
          </span>
          <span className="text-white text-sm font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.22)]">
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
