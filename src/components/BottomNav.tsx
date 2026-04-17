import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

import todayIcon from "@/assets/icons/today.png";
import tasksIcon from "@/assets/icons/tasks.png";
import budgetIcon from "@/assets/icons/budget.png";
import mealsIcon from "@/assets/icons/meals.png";
import listsIcon from "@/assets/icons/lists.png";

const navItems = [
  { path: "/", label: "Today", icon: todayIcon },
  { path: "/tasks", label: "Tasks", icon: tasksIcon },
  { path: "/budget", label: "Budget", icon: budgetIcon },
  { path: "/meals", label: "Meals", icon: mealsIcon },
  { path: "/shopping", label: "Lists", icon: listsIcon },
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
        {navItems.map(({ path, label, icon }) => {
          const active = location.pathname === path;

          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="
                flex flex-col items-center justify-center
                flex-1 gap-[2px]
                text-[11px] font-medium
                transition-all duration-200 active:scale-95
              "
            >
              {/* ICON */}
              <img
                src={icon}
                alt={label}
                className={clsx(
                  "w-5 h-5 transition-all duration-200",
                  active ? "opacity-100 scale-110 drop-shadow-[0_0_6px_rgba(111,168,255,0.6)]" : "opacity-50",
                )}
              />

              {/* LABEL */}
              <span
                className={clsx(
                  "leading-none transition-all duration-200",
                  active ? "text-[#6FA8FF]" : "text-muted-foreground opacity-70",
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
