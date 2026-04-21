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
    <Card variant="elevated" className="px-5 py-4">
      <div className="flex items-center justify-between mb-5"><p className="text-[17px] font-semibold text-secondary-foreground">Money left this week</p></div>
      <div className="rounded-md px-5 py-5 shadow-elevated gradient-budget text-primary-foreground">
        <div className="flex items-baseline gap-2"><span className="text-3xl font-medium leading-none">${remaining}</span><span className="text-sm font-medium">left to spend</span></div>
      </div>
      <div className="flex items-center justify-between mt-5"><p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">${spent}</span> Spent</p></div>
    </Card>
  );
};

export default MoneyLeftCard;
