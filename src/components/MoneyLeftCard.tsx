import { Card } from "@/components/ui/Card";
import { UIText } from "@/components/ui/Text";
import { brandGradients } from "@/theme";

interface MoneyLeftCardProps {
  remaining?: number;
  spent?: number;
}

const MoneyLeftCard = ({
  remaining = 120,
  spent = 35,
}: MoneyLeftCardProps) => {
  return (
    <Card variant="default">
      <div className="flex items-center justify-between mb-3">
        <UIText.HeadingL>
          Money left this week
        </UIText.HeadingL>
      </div>

      {/* Inner gradient block */}
      <div
        className="rounded-lg p-4 text-white drop-shadow-soft shadow-[var(--shadow-surface)]"
        style={{
          background: brandGradients.secondary,
          filter: "saturate(1.1) contrast(1.05)",
        }}
      >
        <div className="flex items-baseline gap-2">
          <UIText.Display>
            ${remaining}
          </UIText.Display>
          <UIText.Micro>
            left to spend
          </UIText.Micro>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <UIText.Micro>
          <span className="font-bold">${spent}</span> Spent
        </UIText.Micro>
      </div>
    </Card>
  );
};

export default MoneyLeftCard;
