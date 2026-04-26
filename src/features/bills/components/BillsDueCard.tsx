import { ChevronRight } from "lucide-react";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { UIText } from "@/components/ui/Text";
import { useBillViews } from "@/features/bills/selectors/billsSelectors";
import { brandGradients, semanticColors } from "@/theme";
import EmptyState from "@/components/ui/EmptyState";

interface BillView {
  key: string;
  name: string;
  amount: string;
  iconBg: string;
  accent: string;
}

const palette = [
  { iconBg: brandGradients.billWarm, accent: semanticColors.billWarm },
  { iconBg: brandGradients.billCool, accent: semanticColors.billCool },
  { iconBg: brandGradients.billBlue, accent: semanticColors.accentText },
];

const fallbackPalette = palette[0];

const BillsDueCard = () => {
  const billViews = useBillViews();

  const bills: BillView[] = billViews.map((b) => {
    const colors = palette[b.index % palette.length] ?? fallbackPalette;
    return {
      key: b.key,
      name: b.name,
      amount: b.amount,
      iconBg: colors.iconBg,
      accent: colors.accent,
    };
  });

  return (
    <Card variant="default">
      <CardHeader title="Bills Due" />
      <CardBody>
        {bills.length === 0 ? (
          <EmptyState
            title="No bills due"
            description="You're all caught up"
            className="py-6"
          />
        ) : (
          <ul className="divide-y divide-foreground/[0.05]">
            {bills.map((b) => (
              <li key={b.key}>
                <button
                  type="button"
                  aria-label={`View ${b.name}`}
                  className="w-full flex items-center gap-3 py-3 active:opacity-70 transition"
                >
                  <span
                    className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center shadow-sm"
                    style={{ background: b.iconBg }}
                  >
                    <span className="block w-3.5 h-3.5 rounded-sm bg-white/90" />
                  </span>

                  <div className="flex-1 text-left min-w-0">
                    <UIText.BodyStrong truncate>{b.name}</UIText.BodyStrong>
                    <UIText.Label tone="danger">Due today</UIText.Label>
                  </div>

                  <UIText.BodyStrong style={{ color: b.accent }}>
                    {b.amount}
                  </UIText.BodyStrong>

                  <ChevronRight size={16} className="text-muted-foreground" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
};

export default BillsDueCard;
