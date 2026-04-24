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
    <div
      className="
        rounded-xl
        bg-white/60
        backdrop-blur-md
        border border-white/40
        px-3 py-3
        space-y-2
      "
    >
      <UIText.Title>Today Overview</UIText.Title>

      <div className="space-y-1">
        {insights.active.slice(0, 3).map((item) => (
          <div
            key={item.category}
            className="flex items-center justify-between"
          >
            <UIText.Micro className="font-medium">{item.category}</UIText.Micro>

            <UIText.Micro className="text-foreground font-medium">
              {item.active} left
            </UIText.Micro>
          </div>
        ))}
      </div>
    </div>
  );
};
