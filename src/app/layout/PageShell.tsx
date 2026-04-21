import { type ReactNode } from "react";

interface PageShellProps {
  children: ReactNode;
}

const PageShell = ({ children }: PageShellProps) => <div className="space-y-5">{children}</div>;

export default PageShell;
