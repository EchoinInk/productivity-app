import { Card } from "@/components/ui/Card";
import { Heading, Text } from "@/components/ui/Text";

export interface SummaryCardViewModel {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: "default" | "primary" | "success" | "warning";
}

export const SummaryCardView = ({ model }: { model: SummaryCardViewModel }) => {
  const { title, value, subtitle, icon, variant = "default" } = model;

  const variantStyles = {
    default: "bg-card border-border",
    primary: "bg-primary/10 border-primary/20",
    success: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
    warning: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800"
  };

  return (
    <Card className={`p-4 ${variantStyles[variant]} hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <Text className="text-sm text-muted-foreground mb-1">{title}</Text>
          <Heading className="text-xl font-bold text-foreground truncate">{value}</Heading>
          {subtitle && (
            <Text className="text-sm text-muted-foreground mt-1">{subtitle}</Text>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 text-muted-foreground/70">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};
