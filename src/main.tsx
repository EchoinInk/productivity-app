import { createRoot } from "react-dom/client";
import ErrorBoundary from "@/app/providers/ErrorBoundary";
import { QueryProvider } from "@/app/providers/QueryProvider";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root was not found.");
}

createRoot(rootElement).render(
  <ErrorBoundary>
    <QueryProvider>
      <App />
    </QueryProvider>
  </ErrorBoundary>,
);
