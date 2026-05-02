import { type ReactNode } from "react";
import BottomNav from "@/components/layout/BottomNav";

interface AppShellProps {
  children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => (
  <div className="min-h-screen bg-white">
    
    {/* CONTENT */}
    <div className="w-full lg:max-w-[430px] lg:mx-auto">
      <main>
        {children}
      </main>
    </div>

    {/* NAV */}
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div
        className="
          w-full max-w-[430px]
          pointer-events-auto
          bg-white/95 backdrop-blur-xl
          border-t border-black/5
          shadow-[0_-6px_30px_rgba(0,0,0,0.08)]
          pb-[env(safe-area-inset-bottom)]
        "
      >
        <BottomNav />
      </div>
    </div>
  </div>
);

export default AppShell;
