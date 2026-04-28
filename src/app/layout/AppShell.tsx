import { type ReactNode } from "react";
import BottomNav from "@/components/BottomNav";

interface AppShellProps {
  children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => (
  <div className="min-h-screen flex justify-center bg-gradient-page">
    <div className="w-full max-w-md min-h-screen flex flex-col relative">
      <main className="flex-1 pb-28 px-4 pt-6">{children}</main>
      <div className="absolute bottom-0 left-0 right-0">
        <BottomNav />
      </div>
    </div>
  </div>
);

export default AppShell;
