import { type KeyboardEvent } from "react";

interface TabBarProps<T extends string> {
  tabs: T[];
  activeTab: T;
  onTabChange: (tab: T) => void;
}

const TabBar = <T extends string>({ tabs, activeTab, onTabChange }: TabBarProps<T>) => {
  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const offset = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + offset + tabs.length) % tabs.length;
    const nextTab = tabs[nextIndex];

    if (nextTab) onTabChange(nextTab);
  };

  return (
    <div role="tablist" aria-label="Shopping category" className="grid grid-cols-2 gap-2">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          role="tab"
          type="button"
          aria-selected={tab === activeTab}
          tabIndex={tab === activeTab ? 0 : -1}
          onClick={() => onTabChange(tab)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          className={
            tab === activeTab
              ? "h-11 rounded-md bg-primary text-primary-foreground text-sm font-semibold shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              : "h-11 rounded-md bg-card/70 text-muted-foreground text-sm font-semibold border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          }
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
