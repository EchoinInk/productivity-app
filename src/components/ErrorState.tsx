import { UIText } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

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
    <UIText.Heading className="text-destructive mb-2">
      Error
    </UIText.Heading>
    <UIText.BodyMuted className="mb-4">
      {message}
    </UIText.BodyMuted>
    {onRetry && (
      <Button onClick={onRetry} variant="secondary">
        Try Again
      </Button>
    )}
  </div>
);

export default ErrorState;
