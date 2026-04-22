interface EmptyStateProps {
  children: string;
}

export const EmptyState = ({ children }: EmptyStateProps) => (
  <p className="text-sm text-muted-foreground py-4 text-center">{children}</p>
);
