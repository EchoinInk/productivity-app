import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { Lightbulb, TrendingUp, Target, Zap } from "lucide-react";

export interface InsightsCardViewModel {
  insights: Array<{
    id: string;
    type: "achievement" | "encouragement" | "warning" | "tip";
    message: string;
    priority: "high" | "medium" | "low";
  }>;
}

const getInsightIcon = (type: string) => {
  switch (type) {
    case "achievement":
      return <TrendingUp size={16} className="text-green-600" />;
    case "encouragement":
      return <Zap size={16} className="text-blue-600" />;
    case "warning":
      return <Target size={16} className="text-orange-600" />;
    case "tip":
      return <Lightbulb size={16} className="text-purple-600" />;
    default:
      return <Lightbulb size={16} className="text-gray-600" />;
  }
};

const getInsightColor = (type: string) => {
  switch (type) {
    case "achievement":
      return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
    case "encouragement":
      return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800";
    case "warning":
      return "bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800";
    case "tip":
      return "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800";
    default:
      return "bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800";
  }
};

export const InsightsCardView = ({ model }: { model: InsightsCardViewModel }) => {
  const { insights } = model;

  if (insights.length === 0) {
    return null;
  }

  return (
    <Card className="p-4">
      <div className="space-y-3">
        <Text className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Lightbulb size={16} className="text-yellow-600" />
          Insights
        </Text>
        
        <div className="space-y-2">
          {insights.slice(0, 2).map((insight) => (
            <div
              key={insight.id}
              className={`flex items-start gap-2 p-2 rounded-lg border ${getInsightColor(
                insight.type
              )}`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getInsightIcon(insight.type)}
              </div>
              <Text className="text-xs leading-relaxed text-foreground flex-1">
                {insight.message}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
