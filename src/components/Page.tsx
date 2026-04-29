import { type ReactNode } from "react";
import Header from "./Header";

interface PageProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const Page = ({ title, subtitle, children, className = "" }: PageProps) => (
  <div className={`space-y-4 ${className}`}>
    {title && <Header title={title} subtitle={subtitle} />}
    {children}
  </div>
);

export default Page;
