import { Surface } from "@/components/ui/Surface";
import { ProgressBar } from "@/components/ui/ProgressBar";
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
    <Surface className="space-y-2">
      <div className="flex items-center justify-between">
        <UIText.HeadingM>Today Progress</UIText.HeadingM>

        <UIText.Meta>
          {progress.completed}/{progress.total}
        </UIText.Meta>
      </div>

      <ProgressBar value={progress.percentage} ariaLabel="Today progress" />

      <UIText.Meta>
        {progress.percentage === 100
          ? "All tasks completed 🎉"
          : `${progress.percentage}% complete`}
      </UIText.Meta>
    </Surface>
  );
};
