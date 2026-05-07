import { NavLink } from "react-router-dom";
import clsx from "clsx";
import todayIcon from "@/assets/navigation/today.webp";
import tasksIcon from "@/assets/navigation/tasks.webp";
import budgetIcon from "@/assets/navigation/budget.webp";
import mealsIcon from "@/assets/navigation/meals.webp";
import listsIcon from "@/assets/navigation/lists.webp";

/**
 * Bottom Navigation - Optimized for Mobile Ergonomics
 *
 * Design targets:
 * - 44px minimum touch targets (Apple HIG)
 * - Thumb-zone accessibility (frequent items centered)
 * - Clear visual feedback (active state with scale + color)
 * - Reduced item count for faster scanning
 */
const navItems = [
  { path: "/", label: "Today", icon: todayIcon },
  { path: "/tasks", label: "Tasks", icon: tasksIcon },
  { path: "/budget", label: "Budget", icon: budgetIcon },
  { path: "/meals", label: "Meals", icon: mealsIcon },
  { path: "/shopping", label: "Lists", icon: listsIcon },
];

const BottomNav = () => (
  <nav
    aria-label="Primary"
    className="h-16 sm:h-[72px] flex items-center justify-around px-2 sm:px-4"
  >
    {navItems.map(({ path, label, icon }) => (
      <NavLink
        key={path}
        to={path}
        className={({ isActive }) =>
          clsx(
            // 44px minimum touch target with comfortable spacing
            "group flex flex-col items-center justify-center min-w-[44px] min-h-[44px] flex-1 gap-1",
            "text-xs font-medium transition-all duration-200 ease-out",
            // Active state: clear visual feedback
            isActive
              ? "text-primary scale-105"
              : "text-text-muted hover:text-text-primary active:scale-95"
          )
        }
      >
        {({ isActive }) => (
          <>
            {/* Larger icon with active animation */}
            <div className={clsx(
              "relative flex items-center justify-center",
              "w-8 h-8 sm:w-9 sm:h-9 rounded-lg transition-all duration-200",
              isActive ? "bg-primary/10" : "bg-transparent group-hover:bg-surface-elevated"
            )}>
              <img
                src={icon}
                srcSet={`${icon} 1x`}
                sizes="(max-width: 640px) 24px, 28px"
                alt=""
                width={24}
                height={24}
                loading="lazy"
                decoding="async"
                className={clsx(
                  "w-5 h-5 sm:w-6 sm:h-6 object-contain transition-transform duration-200",
                  isActive ? "scale-110" : "opacity-80 group-hover:opacity-100"
                )}
              />
              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary" />
              )}
            </div>
            {/* Label with better spacing */}
            <span className="text-[11px] sm:text-xs leading-none font-medium">
              {label}
            </span>
          </>
        )}
      </NavLink>
    ))}
  </nav>
);

export default BottomNav;
