import { Bell, Menu } from "lucide-react";
import { UIText } from "@/components/ui/Text";
import { brandGradients } from "@/theme";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Menu size={20} aria-hidden="true" className="text-muted-foreground" />

        <UIText.Header>{title}</UIText.Header>

        <Bell size={20} aria-hidden="true" className="text-muted-foreground" />
      </div>

      {subtitle && (
        <div
          className="
            rounded-full px-4 py-2 text-center
            backdrop-blur-xl
            shadow-[inset_0_1px_var(--space-1)_rgba(255,255,255,0.6),0_var(--space-2)_20px_rgba(0,0,0,0.05)]
          "
          style={{
            background: brandGradients.datePill,
          }}
        >
          <UIText.Meta>{subtitle}</UIText.Meta>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
