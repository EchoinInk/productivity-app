import { useMemo } from "react";
import { getToday } from "@/shared/lib/date";
import { useTasksStore } from "@/features/tasks/store/useTasksStore";
import { getTodayCategorySummaries } from "@/features/tasks/selectors/taskSelectors";
import { UIText } from "@/components/ui/Text";

export const TaskInsights = () => {
  const tasks = useTasksStore((s) => s.tasks);
  const today = getToday();

  const summaries = useMemo(
    () => getTodayCategorySummaries(tasks, today),
    [tasks, today]
  );

  const active = summaries.filter((s) => s.active > 0);

  if (active.length === 0) return null;

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