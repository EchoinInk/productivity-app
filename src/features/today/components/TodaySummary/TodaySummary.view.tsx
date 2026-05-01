import React from "react";
import { ChevronRight } from "lucide-react";

type Card = {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  variant: "success" | "default" | "warning" | "primary";
};

export const TodaySummaryView = ({
  model,
}: {
  model: { cards: Card[] };
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {model.cards.map((card, _i) => (
       <div
        key={_i}
  className="
    relative
    p-4
    rounded-2xl
    bg-card
    border border-border/30
    shadow-[0_1px_2px_rgba(0,0,0,0.04)]
    flex
    justify-between
    items-center
    gap-3
    transition-transform
    active:scale-[0.97]
    cursor-pointer
    hover:shadow-md
  "
>
 {/* TEXT */}
<div className="flex flex-col min-w-0 pr-8">
  <p className="text-xs text-muted-foreground">
    {card.title}
  </p>

  <p className="text-lg font-semibold leading-snug whitespace-nowrap mt-2">
    {card.value}
  </p>

  <p className="text-xs text-muted-foreground leading-snug whitespace-nowrap">
    {card.subtitle}
  </p>
</div>


  {/* ICON (FIXED POSITION) */}
  <div className="w-11 h-11 flex items-center justify-center shrink-0">
  {card.icon}
</div>

  {/* CHEVRON */}
  <ChevronRight
    className="
      absolute
      right-3
      top-1/2
      -translate-y-1/2
      w-4 h-4
      text-muted-foreground/50
    "
  />
</div>
      ))}
    </div>
  );
};