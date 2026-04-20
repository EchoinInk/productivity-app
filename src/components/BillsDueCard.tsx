import { ChevronRight } from "lucide-react";
import clsx from "clsx";
import { cardSoft } from "@/lib/theme";
import moreIcon from "@/assets/icons/more-vertical.svg";
import { useAppStore } from "@/store/useAppStore";

interface BillView {
  key: string;
  name: string;
  amount: string;
  iconBg: string;
  accent: string;
}

const demoBills: BillView[] = [
  {
    key: "demo-electric",
    name: "Electric Bill",
    amount: "$80",
    iconBg: "linear-gradient(135deg,#FFE7D1,#FADCEB)",
    accent: "#C99BB8",
  },
  {
    key: "demo-netflix",
    name: "Netflix",
    amount: "Due Today",
    iconBg: "linear-gradient(135deg,#F8DFFF,#E7D9FF)",
    accent: "#9B8AC4",
  },
];

const palette = [
  { iconBg: "linear-gradient(135deg,#FFE7D1,#FADCEB)", accent: "#C99BB8" },
  { iconBg: "linear-gradient(135deg,#F8DFFF,#E7D9FF)", accent: "#9B8AC4" },
  { iconBg: "linear-gradient(135deg,#D1F0FF,#E0E7FF)", accent: "#7C8BC4" },
];

const BillsDueCard = () => {
  const storeBills = useAppStore((s) => s.bills);

  const bills: BillView[] = storeBills.length
    ? storeBills.map((b, i) => ({
        key: String(b.id),
        name: b.name,
        amount: `$${b.amount.toFixed(0)}`,
        iconBg: palette[i % palette.length].iconBg,
        accent: palette[i % palette.length].accent,
      }))
    : demoBills;

  return (
    <section className={clsx(cardSoft, "px-5 py-4")}>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[16px] font-semibold text-secondary-foreground">Bills Due</h2>
        <button aria-label="More" className="p-1 -mr-1">
          <img src={moreIcon} alt="" className="w-5 h-5" />
        </button>
      </div>

      <ul className="divide-y divide-foreground/[0.05]">
        {bills.map((b) => (
          <li key={b.key}>
            <button className="w-full flex items-center gap-3 py-4 active:opacity-70 transition">
              <span
                className="w-9 h-9 rounded-2xl shrink-0 flex items-center justify-center shadow-[0_4px_10px_rgba(180,150,200,0.15)]"
                style={{ background: b.iconBg }}
              >
                <span className="block w-3 h-3 rounded-sm bg-white/90" />
              </span>
              <span className="flex-1 text-left text-[15px] font-normal text-foreground/85">{b.name}</span>
              <span className="text-[14px] font-medium" style={{ color: b.accent }}>
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
