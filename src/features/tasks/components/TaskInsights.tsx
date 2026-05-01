import { Surface } from "@/components/ui/Surface";
import { HeroTitle, Label } from "@/components/ui/Text";

import { useTasks } from "@/features/tasks/hooks/useTasks";

/**
 * Today insights card. Pure presentation — data comes
 * from the unified `useTasks` hook.
 */
export const TaskInsights = () => {
  const { sections } = useTasks();

  const todayTasks = sections.today;
  const hasInsights = todayTasks.length > 0;

  if (!hasInsights) {
    return (
      <Surface className="space-y-2">
        <HeroTitle>Today Overview</HeroTitle>
        <Label className="text-muted-foreground">
          Start adding tasks to see insights here
        </Label>
      </Surface>
    );
  }

  // Group tasks by category
  const categoryStats = todayTasks.reduce((acc, task) => {
    const category = task.category || 'Other';
    if (!acc[category]) {
      acc[category] = { category, count: 0, completed: 0 };
    }
    acc[category].count++;
    if (task.completed) {
      acc[category].completed++;
    }
    return acc;
  }, {} as Record<string, { category: string; count: number; completed: number }>);

  const activeCategories = Object.values(categoryStats)
    .filter(stat => stat.count > stat.completed)
    .slice(0, 3);

  return (
    <Surface className="space-y-2">
      <HeroTitle>Today Overview</HeroTitle>

      <div className="space-y-1">
        {activeCategories.map((item) => (
          <div
            key={item.category}
            className="flex items-center justify-between"
          >
            <Label className="font-medium">{item.category}</Label>

            <Label className="text-foreground font-medium">
              {item.count - item.completed} left
            </Label>
          </div>
        ))}
      </div>
    </Surface>
  );
};
