import clsx from "clsx";

interface TabBarProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabBar = ({ tabs, activeTab, onTabChange }: TabBarProps) => {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={clsx(
              "flex-1 py-2 px-3 rounded-lg text-sm font-medium",
              "transition-all duration-150",

              isActive ? "bg-white text-foreground shadow-sm" : "text-muted-foreground",
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default TabBar;
