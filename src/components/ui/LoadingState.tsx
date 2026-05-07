interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const LoadingState = ({ message = "Loading...", size = "md" }: LoadingStateProps) => {
  const sizeClass = {
    sm: "min-h-[120px]",
    md: "min-h-[200px]", 
    lg: "min-h-[280px]"
  };

  return (
    <div className={`flex flex-col items-center justify-center ${sizeClass[size]} text-sm text-text-muted`}>
      <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin mb-3" />
      {message && <div className="animate-pulse">{message}</div>}
    </div>
  );
};

export default LoadingState;
