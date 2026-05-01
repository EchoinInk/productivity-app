import { NavLink } from "react-router-dom";
import clsx from "clsx";
import todayIcon from "@/assets/navigation/today.webp";
import tasksIcon from "@/assets/navigation/tasks.webp";
import budgetIcon from "@/assets/navigation/budget.webp";
import mealsIcon from "@/assets/navigation/meals.webp";
import listsIcon from "@/assets/navigation/lists.webp";
import recipesIcon from "@/assets/navigation/recipes.webp";

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
      h-[72px]
      flex items-center justify-around
      px-3
    "
  >
    {navItems.map(({ path, label, icon }) => (
      <NavLink
        key={path}
        to={path}
        className={({ isActive }) =>
          clsx(
            "flex flex-col items-center justify-center flex-1 gap-[2px] text-xs font-medium transition-all duration-200 active:scale-95",
            isActive ? "text-primary" : "text-muted-foreground opacity-90"
          )
        }
      >
        {({ isActive }) => (
          <>
            <img
              src={icon}
              srcSet={`${icon} 1x`}
              sizes="28px"
              alt=""
              width={28}
              height={28}
              loading="lazy"
              className={clsx(
                "w-7 h-7 transition-all duration-200",
                isActive ? "opacity-100 scale-110" : "opacity-80"
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
