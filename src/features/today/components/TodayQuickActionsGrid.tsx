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
      className="
        relative 
        rounded-2xl 
        p-4 
        border border-white/40
        bg-white/70 backdrop-blur-md
        shadow-[0_6px_20px_rgba(0,0,0,0.06)]
        transition-all duration-150 ease-out
        active:scale-[0.97]
        hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]
        cursor-pointer
      "
    >
      <div className="flex items-center gap-3">
        {/* Left: text */}
        <div className="flex-1 min-w-0 flex flex-col">
          <Body tone="muted">{title}</Body>

          <Heading className="mt-1 tracking-tight">
            {value}
          </Heading>

          <Meta tone="muted" className="mt-1">
            {subtitle}
          </Meta>
        </div>

        {/* Right: icon */}
        <div className="shrink-0 opacity-75">
          {icon}
        </div>
      </div>

      {/* Chevron */}
      <ChevronRight
        size={14}
        className="absolute bottom-3 right-3 text-muted-foreground/40"
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
    <div className="grid grid-cols-2 gap-4 mt-2">
      <SummaryCard
        title="Tasks"
        value={tasks}
        subtitle="To do"
        background="#f2fdfb"
        icon={
          <img
            src={taskillustration}
            alt="Tasks"
            width={42}
            height={42}
            className="object-contain"
          />
        }
        onClick={() => navigate("/tasks")}
      />

      <SummaryCard
        title="Meals"
        value={meals}
        subtitle="Planned"
        background="#f4f7fd"
        icon={
          <img
            src={mealillustration}
            alt="Meals"
            width={42}
            height={42}
            className="object-contain"
          />
        }
        onClick={() => navigate("/meals")}
      />

      <SummaryCard
        title="Budget"
        value={`$${remaining}`}
        subtitle="Left this week"
        background="#f7f7fe"
        icon={
          <img
            src={budgetillustration}
            alt="Budget"
            width={42}
            height={42}
            className="object-contain"
          />
        }
        onClick={() => navigate("/budget")}
      />

      <SummaryCard
        title="Shopping"
        value={shopping}
        subtitle="Items"
        background="#f9f5fc"
        icon={
          <img
            src={shoppingillustration}
            alt="Shopping"
            width={42}
            height={42}
            className="object-contain"
          />
        }
        onClick={() => navigate("/shopping")}
      />
    </div>
  );
};

export default TodayQuickActionsGrid;