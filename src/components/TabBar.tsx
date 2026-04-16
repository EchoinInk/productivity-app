interface TabBarProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabBar = ({ tabs, activeTab, onTabChange }: TabBarProps) => {
  return (
    <div className="flex gap-1 bg-secondary rounded-xl p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            activeTab === tab
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
