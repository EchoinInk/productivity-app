import { UIText } from "@/components/ui/Text";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <UIText.HeadingXL>{title}</UIText.HeadingXL>
      </div>

      {subtitle && (
        <div className="rounded-full px-4 py-2 text-center backdrop-blur-xl bg-gradient-date-pill shadow-[inset_0_1px_var(--space-1)_hsl(0_0%_100%/0.6),0_var(--space-2)_20px_hsl(220_20%_10%/0.05)]">
          <UIText.Meta>{subtitle}</UIText.Meta>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
