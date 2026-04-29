import { Surface } from "@/components/ui/Surface";
import { HeroTitle, Label } from "@/components/ui/Text";

import { useTasks } from "@/features/tasks/hooks/useTasks";

/**
 * Today insights card. Pure presentation — data comes
 * from the unified `useTasks` hook.
 */
export const TaskInsights = () => {
  const { insights } = useTasks();

  if (!insights.hasInsights) return null;

  return (
    <Surface className="space-y-2">
      <HeroTitle>Today Overview</HeroTitle>

      <div className="space-y-1">
        {insights.active.slice(0, 3).map((item) => (
          <div
            key={item.category}
            className="flex items-center justify-between"
          >
            <Label className="font-medium">{item.category}</Label>

            <Label className="text-foreground font-medium">
              {item.active} left
            </Label>
          </div>
        ))}
      </div>
    </Surface>
  );
};
