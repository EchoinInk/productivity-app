import { useLocation, useNavigate } from "react-router-dom";
import { Home, ClipboardList, Wallet, Utensils, ListChecks } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { path: "/", label: "Today", icon: Home },
  { path: "/tasks", label: "Tasks", icon: ClipboardList },
  { path: "/budget", label: "Budget", icon: Wallet },
  { path: "/meals", label: "Meals", icon: Utensils },
  { path: "/shopping", label: "Lists", icon: ListChecks },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="px-3 pb-3">
      <nav
        className="
          h-16 flex items-center justify-around
          rounded-2xl
          bg-white/70 backdrop-blur-2xl
          border border-white/50
          shadow-[0_20px_40px_rgba(0,0,0,0.15)]
        "
      >
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;

          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="
                flex flex-col items-center justify-center
                flex-1
                gap-[2px]
                text-[11px] font-medium
                transition-all active:scale-95
              "
            >
              <Icon
                size={20}
                strokeWidth={2.2}
                className={clsx(
                  "transition-all",
                  active ? "text-[#6FA8FF] scale-110" : "text-muted-foreground opacity-80",
                )}
              />

              <span
                className={clsx(
                  "leading-none transition-all",
                  active ? "text-[#6FA8FF]" : "text-muted-foreground opacity-80",
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
