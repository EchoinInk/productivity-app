import { Surface } from "@/components/ui/Surface";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Heading, Meta } from "@/components/ui/Text";

import { useTasks } from "@/features/tasks/hooks/useTasks";

/**
 * Today's progress card. Pure presentation — data
 * comes from the unified `useTasks` hook.
 */
export const TaskProgress = () => {
  const { progress } = useTasks();

  if (progress.total === 0) {
    return (
      <Surface className="space-y-2">
        <div className="flex items-center justify-between">
          <Heading>Today Progress</Heading>
          <Meta>No tasks</Meta>
        </div>
        <ProgressBar value={0} ariaLabel="No tasks progress" />
        <Meta>Enjoy your free day! 🎉</Meta>
      </Surface>
    );
  }

  return (
    <Surface className="space-y-2">
      <div className="flex items-center justify-between">
        <Heading>Today Progress</Heading>

        <Meta>
          {progress.completed}/{progress.total}
        </Meta>
      </div>

      <ProgressBar value={progress.percentage} ariaLabel="Today progress" />

      <Meta>
        {progress.percentage === 100
          ? "All tasks completed 🎉"
          : `${progress.percentage}% complete`}
      </Meta>
    </Surface>
  );
};
