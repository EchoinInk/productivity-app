import { safeRatio } from "@/shared/lib/number";
import { Card } from "@/components/ui/Card";
import { surfaces, surfaceShadow } from "@/theme/surfaces";

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
    <Card variant="default" className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold">
          Money left this week
        </h2>
      </div>

      {/* Inner gradient block */}
      <div className={`rounded-xl p-4 text-white ${surfaceShadow}`}
  style={surfaces.gradientSubtle}
  >
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
            ${remaining}
          </span>
          <span className="text-sm font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
            left to spend
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
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