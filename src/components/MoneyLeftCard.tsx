import { safeRatio } from "@/shared/lib/number";
import { Card } from "@/shared/ui/Card";

interface MoneyLeftCardProps {
  remaining?: number;
  spent?: number;
  total?: number;
}

const MoneyLeftCard = ({ remaining = 120, spent = 35, total = 155 }: MoneyLeftCardProps) => {
  safeRatio(spent, total);

  return (
    <Card variant="budget" className="px-5 py-4 text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.22)]">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[17px] font-semibold">Money left this week</p>
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-3xl font-medium leading-none">${remaining}</span>
        <span className="text-sm font-medium">left to spend</span>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm opacity-90">
          <span className="font-semibold">${spent}</span> Spent
        </p>
      </div>
    </Card>
  );
};

export default MoneyLeftCard;
