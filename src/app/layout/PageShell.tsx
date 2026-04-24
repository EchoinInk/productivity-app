import { type ReactNode } from "react";
import { brandGradients } from "@/theme";

interface PageShellProps {
  children: ReactNode;
}

const PageShell = ({ children }: PageShellProps) => {
  return (
    <div className="min-h-screen px-4" style={{ background: brandGradients.page }}>
      {children}
    </div>
  );
};

export default PageShell;
