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
  <nav aria-label="Primary" className="h-16 flex items-center justify-around px-3 pb-3">
    {navItems.map(({ path, label, icon }) => (
      <NavLink key={path} to={path} className={({ isActive }) => clsx("flex flex-col items-center justify-center flex-1 gap-[var(--space-1)] text-[11px] font-medium transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md", isActive ? "text-primary" : "text-muted-foreground opacity-70")} aria-label={label}>
        {({ isActive }) => <><img src={icon} alt="" className={clsx("w-8 h-8 transition-all duration-200", isActive ? "opacity-100 scale-110" : "opacity-60")} /><span className="leading-none">{label}</span></>}
      </NavLink>
    ))}
  </nav>
);

export default BottomNav;
