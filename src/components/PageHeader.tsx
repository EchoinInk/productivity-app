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

        <h1 className="text-lg font-semibold text-foreground">{title}</h1>

        <Bell size={20} className="text-muted-foreground" />
      </div>

      {/* 📅 FLOATING DATE PILL */}
      {subtitle && (
        <div
          className="bg-gradient-to-r from-[#DBEAFE]/80 to-[#E9D5FF]/80 backdrop-blbg-gradient-to-r from-[#DBEAFE]/70 to-[#E9D5FF]/70
backdrop-blur-xl
rounded-full
px-4 py-2
text-sm text-center text-muted-foreground
shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_4px_20px_rgba(0,0,0,0.05)]"
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
