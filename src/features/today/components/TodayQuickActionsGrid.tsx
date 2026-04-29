// src/features/today/components/TodayQuickActionsGrid.tsx

import { useNavigate } from "react-router-dom";
import { ClipboardList, Utensils, Wallet, ShoppingCart } from "lucide-react";
import { Body, Heading, Meta } from "@/components/ui/Text";

interface CardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const SummaryCard = ({
  title,
  value,
  subtitle,
  icon,
  onClick,
}: CardProps) => {
  return (
    <div
      onClick={onClick}
      className="rounded-2xl p-4 bg-white shadow-sm border border-muted/30 active:scale-95 transition cursor-pointer flex flex-col justify-between"
    >
      <div className="flex items-center justify-between">
        <Body tone="muted">{title}</Body>
        <div className="opacity-80">{icon}</div>
      </div>

      <div className="mt-4">
        <Heading>{value}</Heading>
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
        icon={<ClipboardList size={20} />}
        onClick={() => navigate("/tasks")}
      />

      <SummaryCard
        title="Meals"
        value={meals}
        subtitle="Planned"
        icon={<Utensils size={20} />}
        onClick={() => navigate("/meals")}
      />

      <SummaryCard
        title="Budget"
        value={`$${remaining}`}
        subtitle="Left this week"
        icon={<Wallet size={20} />}
        onClick={() => navigate("/budget")}
      />

      <SummaryCard
        title="Shopping"
        value={shopping}
        subtitle="Items"
        icon={<ShoppingCart size={20} />}
        onClick={() => navigate("/shopping")}
      />
    </div>
  );
};

export default TodayQuickActionsGrid;