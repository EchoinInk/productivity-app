import { Card } from "@/components/ui/Card";
import { surfaces, surfaceShadow, surfaceText } from "@/theme/surfaces";
import { UIText } from "@/components/ui/Text";

interface MoneyLeftCardProps {
  remaining?: number;
  spent?: number;
  total?: number;
}

const MoneyLeftCard = ({
  remaining = 120,
  spent = 35,
}: MoneyLeftCardProps) => {
  return (
    <Card variant="default">
      <div className="flex items-center justify-between mb-3">
        <UIText.Title>
          Money left this week
        </UIText.Title>
      </div>

      {/* Inner gradient block */}
    <div
  className={`rounded-xl p-4 ${surfaceText} ${surfaceShadow}`}
  style={surfaces.gradientSubtle}
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