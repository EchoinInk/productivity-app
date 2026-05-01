import { CheckCircle, Plus, DollarSign, Utensils } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";

export interface ActivityItem {
  id: string;
  type: "task_completed" | "expense_added" | "meal_logged";
  title: string;
  subtitle?: string;
  timestamp: string;
  icon?: React.ReactNode;
}

export interface ActivityListViewModel {
  activities: ActivityItem[];
  hasActivities: boolean;
}

export const ActivityListView = ({ model }: { model: ActivityListViewModel }) => {
  const { activities, hasActivities } = model;

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "task_completed":
        return <CheckCircle size={16} className="text-green-600 dark:text-green-400" />;
      case "expense_added":
        return <DollarSign size={16} className="text-orange-600 dark:text-orange-400" />;
      case "meal_logged":
        return <Utensils size={16} className="text-blue-600 dark:text-blue-400" />;
      default:
        return <Plus size={16} className="text-muted-foreground" />;
    }
  };

  const getActivityColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "task_completed":
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20";
      case "expense_added":
        return "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20";
      case "meal_logged":
        return "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20";
      default:
        return "border-border bg-card";
    }
  };

  if (!hasActivities) {
    return (
      <div className="flex flex-col gap-6">
        <Text className="text-lg font-semibold text-foreground">Recent Activity</Text>
        <Card className="p-6 text-center">
          <Plus size={32} className="mx-auto text-muted-foreground/50 mb-3" />
          <Text className="text-muted-foreground">No activity yet</Text>
          <Text className="text-sm text-muted-foreground mt-1">
            Start by adding a task
          </Text>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Text className="text-lg font-semibold text-foreground">Recent Activity</Text>
      <div className="space-y-3">
        {activities.map((activity) => (
          <Card 
            key={activity.id} 
            className={cn(
              "p-4 border-l-4 transition-all hover:shadow-md",
              getActivityColor(activity.type)
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {activity.icon || getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <Text className="font-medium text-foreground truncate">
                  {activity.title}
                </Text>
                {activity.subtitle && (
                  <Text className="text-sm text-muted-foreground mt-1">
                    {activity.subtitle}
                  </Text>
                )}
                <Text className="text-xs text-muted-foreground mt-2">
                  {activity.timestamp}
                </Text>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
