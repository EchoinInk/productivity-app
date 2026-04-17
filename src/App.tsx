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
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#FFF7FB] via-[#F8F3FF] to-[#FFE7D1]/40">
        {" "}
        <div className="w-full max-w-md min-h-screen flex flex-col relative">
          <main className="flex-1 pb-28 px-4 pt-6 space-y-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/meals" element={<MealPlanner />} />
              <Route path="/shopping" element={<ShoppingList />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <div className="absolute bottom-0 left-0 right-0">
            <BottomNav />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
