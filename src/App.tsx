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
            <Rimport { BrowserRouter, Route, Routes } from "react-router-dom";

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
      {/* 🌈 SOFT IOS BACKGROUND */}
      <div className="min-h-screen bg-gradient-to-b from-[#F5F7FA] to-[#E9EEF5] flex justify-center">
        
        {/* 📱 APP CONTAINER */}
        <div className="w-full max-w-md min-h-screen flex flex-col relative">
          
          {/* MAIN CONTENT */}
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

          {/* 🔥 FLOATING NAV */}
          <div className="absolute bottom-0 left-0 right-0">
            <BottomNav />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;oute path="/" element={<Dashboard />} />
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
