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
        <UIText.Section>
          Money left this week
        </UIText.Section>
      </div>

      {/* Inner gradient block */}
    <div
  className={`rounded-xl p-4 ${surfaceText} ${surfaceShadow}`}
  style={surfaces.gradientSubtle}
>
        <div className="flex items-baseline gap-2">
<UIText.DisplaySoft>

  ${remaining}

</UIText.DisplaySoft>
          <UIText.LabelSoft>

  left to spend

</UIText.LabelSoft>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3">
        <UIText.Meta>
          <span className="font-semibold">${spent}</span> Spent
        </UIText.Meta>
      </div>
    </Card>
  );
};

export default MoneyLeftCard;