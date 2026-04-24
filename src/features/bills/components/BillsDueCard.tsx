import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { UIText } from "@/components/ui/Text";
import { useBillsStore } from "@/features/bills/store/useBillsStore";
import { brandGradients, semanticColors } from "@/theme";

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
    iconBg: brandGradients.billWarm,
    accent: semanticColors.billWarm,
  },
  {
    key: "demo-netflix",
    name: "Netflix",
    amount: "Due Today",
    iconBg: brandGradients.billCool,
    accent: semanticColors.billCool,
  },
];

const palette = [
  { iconBg: brandGradients.billWarm, accent: semanticColors.billWarm },
  { iconBg: brandGradients.billCool, accent: semanticColors.billCool },
  { iconBg: brandGradients.billBlue, accent: semanticColors.accentText },
];

const fallbackPalette = palette[0];

const BillsDueCard = () => {
  const storeBills = useBillsStore((s) => s.bills);

  const bills: BillView[] = storeBills.length
    ? storeBills.map((b, i) => ({
        key: String(b.id),
        name: b.name,
        amount: `$${b.amount.toFixed(0)}`,
        iconBg: (palette[i % palette.length] ?? fallbackPalette).iconBg,
        accent: (palette[i % palette.length] ?? fallbackPalette).accent,
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
            <button
              type="button"
              aria-label={`View ${b.name}`}
              className="w-full flex items-center gap-3 py-3 active:opacity-70 transition"
            >
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

              <UIText.Micro
                className="font-medium"
                style={{ color: b.accent }}
              >
                {b.amount}
              </UIText.Micro>

              <ChevronRight size={14} style={{ color: semanticColors.billWarm }} />
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default BillsDueCard;
