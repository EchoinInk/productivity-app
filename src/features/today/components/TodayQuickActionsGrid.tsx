// src/features/today/components/TodayQuickActionsGrid.tsx

import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Body, Heading, Meta } from "@/components/ui/Text";

import taskillustration from "@/assets/tasksquickactions.png";
import mealillustration from "@/assets/mealquickactions.png";
import budgetillustration from "@/assets/budgetquickactions.png";
import shoppingillustration from "@/assets/shoppingquickactions.png";

type TileSurface = "tasks" | "meals" | "budget" | "shopping";

const surfaceClass: Record<TileSurface, string> = {
  tasks: "bg-[hsl(var(--surface-tile-tasks))]",
  meals: "bg-[hsl(var(--surface-tile-meals))]",
  budget: "bg-[hsl(var(--surface-tile-budget))]",
  shopping: "bg-[hsl(var(--surface-tile-shopping))]",
};

interface CardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  onClick: () => void;
  surface: TileSurface;
  ariaLabel: string;
}

const SummaryCard = ({
  title,
  value,
  subtitle,
  icon,
  onClick,
  surface,
  ariaLabel,
}: CardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        relative w-full text-left
        rounded-2xl
        p-4
        border border-border/40
        ${surfaceClass[surface]}
        backdrop-blur-md
        shadow-soft
        transition-all duration-150 ease-out
        active:scale-[0.97]
        hover:shadow-pop
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      `}
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
    <div className="grid grid-cols-2 gap-4 mt-2">
      <SummaryCard
        title="Tasks"
        value={tasks}
        subtitle="To do"
        surface="tasks"
        ariaLabel={`Tasks: ${tasks} to do`}
        icon={
          <img
            src={taskillustration}
            alt=""
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
        surface="meals"
        ariaLabel={`Meals: ${meals} planned`}
        icon={
          <img
            src={mealillustration}
            alt=""
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
        surface="budget"
        ariaLabel={`Budget: $${remaining} left this week`}
        icon={
          <img
            src={budgetillustration}
            alt=""
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
        surface="shopping"
        ariaLabel={`Shopping: ${shopping} items`}
        icon={
          <img
            src={shoppingillustration}
            alt=""
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
