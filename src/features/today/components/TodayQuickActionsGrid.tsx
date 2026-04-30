// src/features/today/components/TodayQuickActionsGrid.tsx

import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
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
  background?: string;
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
      className="relative rounded-2xl p-4 shadow-sm border border-muted/30 active:scale-95 transition cursor-pointer"
    >
      <div className="flex items-center gap-3">
        {/* Left: text column */}
        <div className="flex-1 min-w-0 flex flex-col">
          <Body tone="muted">{title}</Body>
          <Heading className="mt-1">{value}</Heading>
          <Meta tone="muted" className="mt-1">{subtitle}</Meta>
        </div>

        {/* Right: icon, vertically centered */}
        <div className="shrink-0 opacity-90">
          {icon}
        </div>
      </div>

      {/* Subtle chevron in bottom-right */}
      <ChevronRight
        size={16}
        className="absolute bottom-3 right-3 text-muted-foreground/60"
      />
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
        icon={<img src={taskillustration} alt="Tasks" width={46} height={46} />}
        onClick={() => navigate("/tasks")}
      />

      <SummaryCard
        title="Meals"
        value={meals}
        subtitle="Planned"
        background="#f4f7fd"
        icon={<img src={mealillustration} alt="Meals" width={46} height={46} />}
        onClick={() => navigate("/meals")}
      />

      <SummaryCard
        title="Budget"
        value={`$${remaining}`}
        subtitle="Left this week"
        background="#f7f7fe"
        icon={<img src={budgetillustration} alt="Budget" width={46} height={46} />}
        onClick={() => navigate("/budget")}
      />

      <SummaryCard
        title="Shopping"
        value={shopping}
        subtitle="Items"
        background="#f9f5fc"
        icon={<img src={shoppingillustration} alt="Shopping" width={46} height={46} />}
        onClick={() => navigate("/shopping")}
      />
    </div>
  );
};

export default TodayQuickActionsGrid;
