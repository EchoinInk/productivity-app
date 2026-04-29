import { UIText } from "@/components/ui/Text";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

const LoadingState = ({ message = "Loading...", className = "" }: LoadingStateProps) => (
  <div className={`flex items-center justify-center py-8 ${className}`}>
    <div className="animate-pulse flex items-center gap-2">
      <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
      <UIText.BodyMuted>{message}</UIText.BodyMuted>
    </div>
  </div>
);

export default LoadingState;
