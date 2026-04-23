import { type ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

const PageShell = ({ children }) => {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f8fc_0%,#eef1f8_100%)] px-4">
      {children}
    </div>
  );
};

export default PageShell;