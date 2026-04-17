import { Bell, Menu } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="space-y-4">
      
      {/* 🔝 TOP BAR */}
      <div className="flex items-center justify-between">
        <Menu size={20} className="text-muted-foreground" />

        <h1 className="text-lg font-semibold text-foreground">
          {title}
        </h1>

        <Bell size={20} className="text-muted-foreground" />
      </div>

      {/* 📅 DATE PILL */}
      {subtitle && (
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 text-sm text-center text-muted-foreground shadow-sm">
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
