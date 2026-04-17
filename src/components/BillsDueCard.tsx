import { ChevronRight } from "lucide-react";
import clsx from "clsx";
import { cardSoft } from "@/lib/theme";
import moreIcon from "@/assets/icons/more-vertical.svg";

interface Bill {
  name: string;
  amount: string;
  iconBg: string;
}

const bills: Bill[] = [
  { name: "Electric Bill", amount: "$80", iconBg: "linear-gradient(135deg,#FFB37A,#FF8AD4)" },
  { name: "Netflix", amount: "Due Today", iconBg: "linear-gradient(135deg,#FF8AD4,#B28BFF)" },
];

const BillsDueCard = () => {
  return (
    <section className={clsx(cardSoft, "px-5 py-4")}>
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-[16px] font-bold text-foreground">Bills Due</h2>
        <button aria-label="More" className="p-1 -mr-1">
          <img src={moreIcon} alt="" className="w-5 h-5" />
        </button>
      </div>

      <ul className="divide-y divide-foreground/[0.06]">
        {bills.map((b) => (
          <li key={b.name}>
            <button className="w-full flex items-center gap-3 py-3.5 active:opacity-70 transition">
              <span
                className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center"
                style={{ background: b.iconBg }}
              >
                <span className="block w-3 h-3 rounded-sm bg-white/90" />
              </span>
              <span className="flex-1 text-left text-[15px] font-semibold text-foreground">
                {b.name}
              </span>
              <span className="text-[15px] font-semibold text-foreground">{b.amount}</span>
              <ChevronRight size={18} className="text-foreground/40" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BillsDueCard;
