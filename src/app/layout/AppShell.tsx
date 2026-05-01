import { type ReactNode } from "react";
import BottomNav from "@/components/layout/BottomNav";

interface AppShellProps {
  children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => (
  <div className="min-h-screen bg-white">
    
    {/* CONTENT */}
    <div className="w-full lg:max-w-[430px] lg:mx-auto">
      {children}
    </div>

    {/* NAV */}
    <div
      className="
        fixed bottom-0 left-0 w-full
        lg:left-1/2 lg:-translate-x-1/2 lg:max-w-[430px]

        bg-white/95 backdrop-blur-xl
        border-t border-black/5
        shadow-[0_-6px_30px_rgba(0,0,0,0.08)]

        z-50
      "
    >
      <BottomNav />
    </div>
  </div>
);

export default AppShell;
