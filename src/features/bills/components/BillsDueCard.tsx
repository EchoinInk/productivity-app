import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { UIText } from "@/components/ui/Text";
import { useBillsStore } from "@/features/bills/store/useBillsStore";

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
  const storeBills = useBillsStore((s) => s.bills);

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
    <Card>
      <div className="flex items-center justify-between mb-3">
        <UIText.Title>Bills Due</UIText.Title>
      </div>

      <ul className="divide-y divide-foreground/[0.05]">
        {bills.map((b) => (
          <li key={b.key}>
            <button className="w-full flex items-center gap-3 py-3 active:opacity-70 transition">
              <span
                className="w-5 h-5 rounded-lg shrink-0 flex items-center justify-center shadow-sm"
                style={{ background: b.iconBg }}
              >
                <span className="block w-3.5 h-3.5 rounded-sm bg-white" />
              </span>

              <div className="flex-1 text-left">
                <UIText.Micro className="font-medium">
                  {b.name}
                </UIText.Micro>
              </div>

              <UIText.Micro className="font-medium"
                style={{ color: b.accent }}
              >
                {b.amount}
              </UIText.Micro>
-
              <ChevronRight size={14} className="text-[#C99BB8]" />
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default BillsDueCard;