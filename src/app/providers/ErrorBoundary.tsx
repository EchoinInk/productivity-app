import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log errors in development only
    if (process.env.NODE_ENV === 'development') {
      console.error("App rendering error", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
          <section className="max-w-sm text-center space-y-4">
            <h1 className="text-xl font-semibold">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">Restart the app view and try again.</p>
            <Button onClick={() => this.setState({ hasError: false })}>Try again</Button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
