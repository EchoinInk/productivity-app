import { useLocation, useNavigate } from "react-router-dom";
import { Home, CheckSquare, DollarSign, UtensilsCrossed, ShoppingCart } from "lucide-react";

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
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 pb-safe">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 text-xs font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
