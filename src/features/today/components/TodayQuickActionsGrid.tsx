// src/features/today/components/TodayQuickActionsGrid.tsx

import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Body, Heading, Meta } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";

import taskillustration from "@/assets/tasksquickactions.webp";
import mealillustration from "@/assets/mealquickactions.webp";
import budgetillustration from "@/assets/budgetquickactions.webp";
import shoppingillustration from "@/assets/shoppingquickactions.webp";

interface CardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
}

const SummaryCard = ({
  title,
  value,
  subtitle,
  icon,
  onClick,
  ariaLabel,
}: CardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="relative w-full text-left active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-transform duration-150 ease-out"
    >
      <Card
        variant="glass"
        className="p-4 opacity-75"
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
          <div className="shrink-0 opacity-60">
            {icon}
          </div>
        </div>

        {/* Chevron */}
        <ChevronRight
          size={14}
          className="absolute bottom-3 right-3 text-muted-foreground/40"
        />
      </Card>
    </button>
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
    <div className="grid grid-cols-2 gap-4 mt-4">
      <SummaryCard
        title="Tasks"
        value={tasks}
        subtitle="To do"
        ariaLabel={`Tasks: ${tasks} to do`}
        icon={
          <img
            src={taskillustration}
            alt=""
            width={42}
            height={42}
            loading="eager"
            fetchPriority="high"
            className="object-contain"
          />
        }
        onClick={() => navigate("/tasks")}
      />

      <SummaryCard
        title="Meals"
        value={meals}
        subtitle="Planned"
        ariaLabel={`Meals: ${meals} planned`}
        icon={
          <img
            src={mealillustration}
            alt=""
            width={42}
            height={42}
            loading="eager"
            fetchPriority="high"
            className="object-contain"
          />
        }
        onClick={() => navigate("/meals")}
      />

      <SummaryCard
        title="Budget"
        value={`$${remaining}`}
        subtitle="Left this week"
        ariaLabel={`Budget: $${remaining} left this week`}
        icon={
          <img
            src={budgetillustration}
            alt=""
            width={42}
            height={42}
            loading="eager"
            fetchPriority="high"
            className="object-contain"
          />
        }
        onClick={() => navigate("/budget")}
      />

      <SummaryCard
        title="Shopping"
        value={shopping}
        subtitle="Items"
        ariaLabel={`Shopping: ${shopping} items`}
        icon={
          <img
            src={shoppingillustration}
            alt=""
            width={42}
            height={42}
            loading="eager"
            fetchPriority="high"
            className="object-contain"
          />
        }
        onClick={() => navigate("/shopping")}
      />
    </div>
  );
};

export default TodayQuickActionsGrid;
