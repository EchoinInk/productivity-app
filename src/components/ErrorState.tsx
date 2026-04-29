import { UIText } from "@/components/ui/Text";
import ActionButton from "@/components/ActionButton";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorState = ({ 
  message = "Something went wrong", 
  onRetry, 
  className = "" 
}: ErrorStateProps) => (
  <div className={`flex flex-col items-center justify-center py-8 px-4 text-center ${className}`}>
    <UIText.HeadingM className="text-destructive mb-2">
      Error
    </UIText.HeadingM>
    <UIText.BodyMuted className="mb-4">
      {message}
    </UIText.BodyMuted>
    {onRetry && (
      <ActionButton onClick={onRetry} variant="secondary">
        Try Again
      </ActionButton>
    )}
  </div>
);

export default ErrorState;
