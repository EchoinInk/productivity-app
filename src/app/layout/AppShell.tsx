import { type ReactNode } from "react";
import BottomNav from "@/components/layout/BottomNav";

interface AppShellProps {
  children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => (
  <>
    {children}

    <div
      className="
        fixed bottom-0 left-1/2 -translate-x-1/2
        w-full max-w-[430px]

        bg-white/95 backdrop-blur-xl
        border-t border-black/5
        shadow-[0_-6px_30px_rgba(0,0,0,0.08)]

        z-50
      "
    >
      <BottomNav />
    </div>
  </>
);

export default AppShell;
