import { UIText } from "@/components/ui/Text";

import { useTasks } from "@/features/tasks/hooks/useTasks";

/**
 * Today's progress card. Pure presentation — data
 * comes from the unified `useTasks` hook.
 */
export const TaskProgress = () => {
  const { progress } = useTasks();

  if (progress.total === 0) return null;

  return (
    <div
      className="
        rounded-lg
        bg-white/60
        backdrop-blur-md
        border border-white/40
        px-3 py-3
        space-y-2
      "
    >
      <div className="flex items-center justify-between">
        <UIText.Section>Today Progress</UIText.Section>

        <UIText.Meta>
          {progress.completed}/{progress.total}
        </UIText.Meta>
      </div>

      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full bg-foreground transition-all duration-500 ease-out"
          style={{ width: `${progress.percentage}%` }}
        />
      </div>

      <UIText.Meta>
        {progress.percentage === 100
          ? "All tasks completed 🎉"
          : `${progress.percentage}% complete`}
      </UIText.Meta>
    </div>
  );
};
