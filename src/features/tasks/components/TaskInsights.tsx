import { Surface } from "@/components/ui/Surface";
import { UIText } from "@/components/ui/Text";

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
      <UIText.HeroTitle>Today Overview</UIText.HeroTitle>

      <div className="space-y-1">
        {insights.active.slice(0, 3).map((item) => (
          <div
            key={item.category}
            className="flex items-center justify-between"
          >
            <UIText.Label className="font-medium">{item.category}</UIText.Label>

            <UIText.Label className="text-foreground font-medium">
              {item.active} left
            </UIText.Label>
          </div>
        ))}
      </div>
    </Surface>
  );
};
