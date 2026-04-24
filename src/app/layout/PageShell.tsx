import { type ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

const PageShell = ({ children }: PageShellProps) => {
  return (
    <div className="min-h-screen bg-[linear-gradient(145deg,#ffffff_0%,#f3f6ff_50%,#eef2ff_100%)] px-4">
      {children}
    </div>
  );
};

export default PageShell;
