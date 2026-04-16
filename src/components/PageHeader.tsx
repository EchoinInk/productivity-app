interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <div className="mb-4">
    {subtitle && <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{subtitle}</p>}
    <h1 className="text-2xl font-bold text-foreground">{title}</h1>
  </div>
);

export default PageHeader;
