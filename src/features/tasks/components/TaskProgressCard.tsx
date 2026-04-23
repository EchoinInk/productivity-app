import { Card } from "@/components/ui/Card";

interface TaskProgressCardProps {
  percentage: number;
  total: number;
  completed: number;
}

const TaskProgressCard = ({
  percentage,
  total,
  completed,
}: TaskProgressCardProps) => {
  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">
          Today’s Progress
        </h2>
        <span className="text-sm text-muted-foreground">
          {completed}/{total}
        </span>
      </div>

      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </Card>
  );
};

export default TaskProgressCard;