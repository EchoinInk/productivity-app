import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppShell from "@/app/layout/AppShell";
import NotFound from "@/app/pages/NotFound";
import { StoreProvider } from "@/app/providers/StoreProvider";
import LoadingState from "@/components/ui/LoadingState";

// Lazy load all screens for code splitting
const HomeScreen = lazy(() => import("@/screens/HomeScreen"));
const TasksPage = lazy(() => import("@/features/tasks/pages/TasksPage"));
const BudgetPage = lazy(() => import("@/features/budget/pages/BudgetPage"));
const MealPlannerPage = lazy(() => import("@/features/meals/pages/MealPlannerPage"));
const ShoppingListPage = lazy(() => import("@/features/shopping/pages/ShoppingListPage"));
const RecipesPage = lazy(() => import("@/features/recipes/pages/RecipesPage"));

const App = () => (
  <StoreProvider>
    <BrowserRouter>
      <AppShell>
        <Suspense fallback={<LoadingState message="Loading..." />}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/meals" element={<MealPlannerPage />} />
            <Route path="/shopping" element={<ShoppingListPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AppShell>
    </BrowserRouter>
  </StoreProvider>
);

export default App;
