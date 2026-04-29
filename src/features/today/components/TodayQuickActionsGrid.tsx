// src/features/today/components/TodayQuickActionsGrid.tsx

import { useNavigate } from "react-router-dom";
import { Body, Heading, Meta } from "@/components/ui/Text";
import taskillustration from "@/assets/tasksquickactions.png";
import mealillustration from "@/assets/mealquickactions.png";
import budgetillustration from "@/assets/budgetquickactions.png";
import shoppingillustration from "@/assets/shoppingquickactions.png";

interface CardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  onClick: () => void;
  background?: string; // NEW
}

const SummaryCard = ({
  title,
  value,
  subtitle,
  icon,
  onClick,
  background,
}: CardProps) => {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: background }}
      className="rounded-2xl p-5 shadow-sm border border-muted/30 active:scale-95 transition cursor-pointer flex flex-col justify-between"
    >
      <div className="flex items-center justify-between">
        <Body tone="muted">{title}</Body>
      </div>

      <div className="mt-1">
        <div className="flex items-center justify-between">
          <Heading>{value}</Heading>
          <div className="opacity-80">{icon}</div>
        </div>
        <Meta tone="muted">{subtitle}</Meta>
      </div>
    </div>
  );
};

interface Props {
  tasks: number;
  meals: number;
  remaining: number;
  shopping: number;
}

const TodayQuickActionsGrid = ({
  tasks,
  meals,
  remaining,
  shopping,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-3">
      <SummaryCard
        title="Tasks"
        value={tasks}
        subtitle="To do"
        background="#f2fdfb"
        icon={<img src={taskillustration} alt="Tasks" width={40} height={40} />}
        onClick={() => navigate("/tasks")}
      />

      <SummaryCard
        title="Meals"
        value={meals}
        subtitle="Planned"
        background="#f4f7fd"
        icon={<img src={mealillustration} alt="Meals" width={40} height={40} />}
        onClick={() => navigate("/meals")}
      />

      <SummaryCard
        title="Budget"
        value={`$${remaining}`}
        subtitle="Left this week"
        background="#f7f7fe"
        icon={<img src={budgetillustration} alt="Budget" width={40} height={40} />}
        onClick={() => navigate("/budget")}
      />

      <SummaryCard
        title="Shopping"
        value={shopping}
        subtitle="Items"
        background="#f9f5fc"
        icon={<img src={shoppingillustration} alt="Shopping" width={40} height={40} />}
        onClick={() => navigate("/shopping")}
      />
    </div>
  );
};

export default TodayQuickActionsGrid;
