import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Budget from "./pages/Budget";
import MealPlanner from "./pages/MealPlanner";
import ShoppingList from "./pages/ShoppingList";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Layout wrapper to ensure:
 * - consistent padding
 * - bottom nav spacing
 * - mobile-friendly container
 */
const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
      {/* Main Content */}
      <main className="flex-1 pb-24 px-4 pt-4 max-w-md mx-auto w-full">
        <Routes location={location}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/meals" element={<MealPlanner />} />
          <Route path="/shopping" element={<ShoppingList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AppLayout />

          {/* Global UI */}
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
