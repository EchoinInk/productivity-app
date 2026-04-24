import { UIText } from "@/components/ui/Text";

import { useTaskInsights } from "@/features/tasks/hooks/useTaskInsights";

/**
 * Today insights card. Purely presentational;
 * UI-ready data comes from `useTaskInsights`.
 */
export const TaskInsights = () => {
  const { active, hasInsights } = useTaskInsights();

  if (!hasInsights) return null;

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
      <UIText.Section>Today Overview</UIText.Section>

      <div className="space-y-1">
        {active.slice(0, 3).map((item) => (
          <div
            key={item.category}
            className="flex items-center justify-between"
          >
            <UIText.Body className="font-medium">
              {item.category}
            </UIText.Body>

            <UIText.Meta className="text-foreground font-medium">
              {item.active} left
            </UIText.Meta>
          </div>
        ))}
      </div>
    </div>
  );
};
