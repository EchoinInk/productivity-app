import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "@/screens/HomeScreen";
import TasksPage from "@/features/tasks/pages/TasksPage";
import BudgetPage from "@/features/budget/pages/BudgetPage";
import MealPlannerPage from "@/features/meals/pages/MealPlannerPage";
import ShoppingListPage from "@/features/shopping/pages/ShoppingListPage";
import RecipesPage from "@/features/recipes/pages/RecipesPage";
import AppShell from "@/app/layout/AppShell";
import NotFound from "@/app/pages/NotFound";
import { StoreProvider } from "@/app/providers/StoreProvider";

const App = () => (
  <StoreProvider>
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/meals" element={<MealPlannerPage />} />
          <Route path="/shopping" element={<ShoppingListPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  </StoreProvider>
);

export default App;
