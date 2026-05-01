import { NavLink } from "react-router-dom";
import clsx from "clsx";
import todayIcon from "@/assets/navigation/today.png";
import tasksIcon from "@/assets/navigation/tasks.png";
import budgetIcon from "@/assets/navigation/budget.png";
import mealsIcon from "@/assets/navigation/meals.png";
import listsIcon from "@/assets/navigation/lists.png";
import recipesIcon from "@/assets/navigation/recipes.png";

const navItems = [
  { path: "/", label: "Today", icon: todayIcon },
  { path: "/tasks", label: "Tasks", icon: tasksIcon },
  { path: "/budget", label: "Budget", icon: budgetIcon },
  { path: "/meals", label: "Meals", icon: mealsIcon },
  { path: "/shopping", label: "Shopping", icon: listsIcon },
  { path: "/recipes", label: "Recipes", icon: recipesIcon },
];

const BottomNav = () => (
  <nav
    aria-label="Primary"
    className="
      fixed bottom-0 left-1/2 -translate-x-1/2
      w-full max-w-[430px]
      h-[72px]
      px-3 pb-[env(safe-area-inset-bottom)]
      flex items-center justify-around

      bg-white/95 backdrop-blur-xl
      border-t border-black/5
      shadow-[0_-6px_30px_rgba(0,0,0,0.08)]

      z-50
    "
  >
    {navItems.map(({ path, label, icon }) => (
      <NavLink
        key={path}
        to={path}
        className={({ isActive }) =>
          clsx(
            "flex flex-col items-center justify-center flex-1 gap-[var(--space-1)] text-[11px] font-medium transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md",
            isActive ? "text-primary" : "text-muted-foreground opacity-70"
          )
        }
        aria-label={label}
      >
        {({ isActive }) => (
          <>
            <img
              src={icon}
              alt=""
              className={clsx(
                "w-7 h-7 transition-all duration-200",
                isActive ? "opacity-100 scale-110" : "opacity-60"
              )}
            />
            <span className="leading-none">{label}</span>
          </>
        )}
      </NavLink>
    ))}
  </nav>
);

export default BottomNav;
