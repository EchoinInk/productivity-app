import type { ShoppingCategory } from "@/features/shopping/types";

interface TabBarProps {
  tabs: ShoppingCategory[];
  activeTab: ShoppingCategory;
  onTabChange: (tab: ShoppingCategory) => void; // ✅ FIX
}

const TabBar = ({ tabs, activeTab, onTabChange }: TabBarProps) => {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange(tab)}
          className={tab === activeTab ? "active" : ""}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabBar;