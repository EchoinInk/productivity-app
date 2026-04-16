import { useLocation, useNavigate } from "react-router-dom";
import { Home, CheckSquare, DollarSign, UtensilsCrossed, ShoppingCart } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { path: "/", label: "Today", icon: Home },
  { path: "/tasks", label: "Tasks", icon: CheckSquare },
  { path: "/budget", label: "Budget", icon: DollarSign },
  { path: "/meals", label: "Meals", icon: UtensilsCrossed },
  { path: "/shopping", label: "Shop", icon: ShoppingCart },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="h-16 flex items-center justify-around border-t border-border bg-white">
      {navItems.map(({ path, label, icon: Icon }) => {
        const active = location.pathname === path;

        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex flex-col items-center justify-center text-xs font-medium flex-1"
          >
            <Icon
              size={22}
              className={clsx("mb-0.5 transition-all", active ? "text-blue-500 scale-110" : "text-muted-foreground")}
              strokeWidth={active ? 2.5 : 2}
            />
            <span className={clsx(active ? "text-blue-500" : "text-muted-foreground")}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
