import { ChevronRight } from "lucide-react";
import clsx from "clsx";
import { cardSoft } from "@/lib/theme";
import moreIcon from "@/assets/icons/more-vertical.svg";

interface Bill {
  name: string;
  amount: string;
  iconBg: string;
  accent: string;
}

const bills: Bill[] = [
  {
    name: "Electric Bill",
    amount: "$80",
    iconBg: "linear-gradient(135deg,#FFE7D1,#FADCEB)",
    accent: "#C99BB8",
  },
  {
    name: "Netflix",
    amount: "Due Today",
    iconBg: "linear-gradient(135deg,#F8DFFF,#E7D9FF)",
    accent: "#9B8AC4",
  },
];

const BillsDueCard = () => {
  return (
    <section className={clsx(cardSoft, "px-5 py-4")}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[16px] font-bold text-foreground">Bills Due</h2>
        <button aria-label="More" className="p-1 -mr-1">
          <img src={moreIcon} alt="" className="w-5 h-5" />
        </button>
      </div>

      <ul className="divide-y divide-foreground/[0.05]">
        {bills.map((b) => (
          <li key={b.name}>
            <button className="w-full flex items-center gap-3 py-4 active:opacity-70 transition">
              <span
                className="w-9 h-9 rounded-md shrink-0 flex items-center justify-center shadow-[0_4px_10px_rgba(180,150,200,0.15)]"
                style={{ background: b.iconBg }}
              >
                <span className="block w-3 h-3 rounded-sm bg-white/90" />
              </span>
              <span className="flex-1 text-left text-[15px] font-medium text-foreground/85">{b.name}</span>
              <span className="text-[14px] font-semibold" style={{ color: b.accent }}>
                {b.amount}
              </span>
              <ChevronRight size={18} className="text-foreground/30" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BillsDueCard;
