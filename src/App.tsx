import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Budget from "./pages/Budget";
import MealPlanner from "./pages/MealPlanner";
import ShoppingList from "./pages/ShoppingList";
import NotFound from "./pages/NotFound";

import BottomNav from "@/components/BottomNav";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F5F7FA] flex flex-col">
        <main className="flex-1 pb-24 px-4 pt-4 max-w-md mx-auto w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/meals" element={<MealPlanner />} />
            <Route path="/shopping" element={<ShoppingList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <BottomNav />
      </div>
    </BrowserRouter>
  );
};

export default App;
