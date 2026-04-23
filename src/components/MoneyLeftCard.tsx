import { safeRatio } from "@/shared/lib/number";
import { Card } from "@/components/ui/Card";
import { gradientSecondaryCss } from "@/lib/gradients";

interface MoneyLeftCardProps {
  remaining?: number;
  spent?: number;
  total?: number;
}

const MoneyLeftCard = ({
  remaining = 120,
  spent = 35,
  total = 155,
}: MoneyLeftCardProps) => {
  const progress = safeRatio(spent, total);

  return (
    <Card className="px-5 py-4">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[17px] font-semibold text-secondary-foreground">
          Money left this week
        </p>
      </div>

      {/* Inner gradient block */}
      <div
        className="
          rounded-xl px-5 py-5
          text-white
          drop-shadow-[0_1px_6px_rgba(0,0,0,0.22)]
        "
        style={{ background: gradientSecondaryCss }}
      >
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold leading-none">
            ${remaining}
          </span>
          <span className="text-sm font-semibold">
            left to spend
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            ${spent}
          </span>{" "}
          Spent
        </p>
      </div>
    </Card>
  );
};

export default MoneyLeftCard;