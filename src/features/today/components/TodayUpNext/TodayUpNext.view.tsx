import { Clock, CheckCircle, Utensils, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";
import { cardVariants } from "@/components/ui/cardVariants";

export interface UpNextItem {
  id: string;
  type: "task" | "meal" | "expense";
  title: string;
  time?: string;
  completed?: boolean;
  onToggle?: () => void;
}

export interface TodayUpNextViewModel {
  items: UpNextItem[];
  hasItems: boolean;
}

export const TodayUpNextView = ({ model }: { model: TodayUpNextViewModel }) => {
  const { items, hasItems } = model;

  const getIcon = (type: UpNextItem["type"]) => {
    switch (type) {
      case "task":
        return <CheckCircle size={16} className={cn("text-muted-foreground")} />;
      case "meal":
        return <Utensils size={16} className={cn("text-muted-foreground")} />;
      case "expense":
        return <DollarSign size={16} className={cn("text-muted-foreground")} />;
      default:
        return <Clock size={16} className={cn("text-muted-foreground")} />;
    }
  };

  const getTypeColor = (type: UpNextItem["type"]) => {
    switch (type) {
      case "task":
        return "text-blue-600 dark:text-blue-400";
      case "meal":
        return "text-green-600 dark:text-green-400";
      case "expense":
        return "text-orange-600 dark:text-orange-400";
      default:
        return "text-muted-foreground";
    }
  };

  if (!hasItems) {
    return (
      <div className="flex flex-col gap-6">
        <Text className="text-lg font-semibold text-foreground">Up Next</Text>
        <Card className="p-6 text-center">
          <Clock size={32} className="mx-auto text-muted-foreground/50 mb-3" />
          <Text className="text-muted-foreground">Nothing scheduled yet</Text>
          <Text className="text-sm text-muted-foreground mt-1">
            Add task
          </Text>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Text className="text-lg font-semibold text-foreground">Up Next</Text>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <Card key={item.id} className={`${cardVariants.base} hover:shadow-md transition-shadow`}>
            <div className="flex items-center gap-3">
              <button
                onClick={item.onToggle}
                className={cn(
                  "flex-shrink-0 w-5 h-5 rounded-full border-2 transition-colors",
                  item.completed
                    ? "bg-primary border-primary"
                    : "border-muted-foreground hover:border-primary"
                )}
              >
                {item.completed && (
                  <CheckCircle size={12} className="w-full h-full text-primary-foreground" />
                )}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {getIcon(item.type)}
                  <Text 
                    className={cn(
                      "font-medium truncate",
                      item.completed && "line-through text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </Text>
                </div>
                {item.time && (
                  <Text className="text-sm text-muted-foreground mt-1">
                    {item.time}
                  </Text>
                )}
              </div>

              <div className="flex-shrink-0">
                <Text className={cn("text-xs font-medium", getTypeColor(item.type))}>
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </Text>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
