import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";

export interface QuickAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  variant?: "primary" | "default";
}

export interface QuickActionsBarViewModel {
  actions: QuickAction[];
}

export const QuickActionsBarView = ({ model }: { model: QuickActionsBarViewModel }) => {
  const { actions } = model;

  return (
    <div className="space-y-4">
      <Text className="text-lg font-semibold text-foreground">Quick Actions</Text>
      <Card className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={action.onPress}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-lg border transition-all",
                "hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
                action.variant === "primary"
                  ? "bg-primary/10 border-primary/20 text-primary"
                  : "bg-card border-border hover:bg-muted/50"
              )}
            >
              <div className={cn(
                "p-2 rounded-full",
                action.variant === "primary"
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}>
                {action.icon}
              </div>
              <Text className="text-sm font-medium text-center">
                {action.title}
              </Text>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};
