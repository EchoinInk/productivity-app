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
    <div className="px-3 pb-3">
      <nav
        className="
          h-16 flex items-center justify-around
          rounded-2xl
          bg-white/50 backdrop-blur-xl
          border border-white/40
          shadow-[0_10px_30px_rgba(0,0,0,0.12)]
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
    gap-[2px]                 // 🔥 tighter spacing
    text-[11px] font-medium   // 🔥 smaller label
    transition-all active:scale-95
  "
            >
              <Icon
                size={20} // 🔥 smaller icon (was 22)
                className={clsx("transition-all", active ? "text-[#6FA8FF] scale-110" : "text-muted-foreground")}
                strokeWidth={active ? 2.5 : 2}
              />

              <span
                className={clsx(
                  "leading-none", // 🔥 removes weird spacing
                  active ? "text-[#6FA8FF]" : "text-muted-foreground",
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
