import { type ReactNode } from "react";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";

interface PageProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const Page = ({ title, subtitle, children, className = "" }: PageProps) => (
  <div className={`min-h-screen flex flex-col ${className}`}>
    {title && <PageHeader title={title} subtitle={subtitle} />}
    <PageBody>
      {children}
    </PageBody>
  </div>
);

export default Page;
