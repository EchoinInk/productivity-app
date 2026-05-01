import { BodyMuted } from "@/components/ui/Text";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

const LoadingState = ({ message = "Loading...", className = "" }: LoadingStateProps) => {
  return (
    <div className={`flex items-center justify-center px-4 py-8 space-y-4 ${className}`}>
      <div className="animate-pulse flex items-center gap-2">
        <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
        <BodyMuted>{message}</BodyMuted>
      </div>
    </div>
  );
};

export default LoadingState;
