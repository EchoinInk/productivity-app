import { useState } from "react";
import AppCard from "@/components/AppCard";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import { Plus } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type MealPlan = Record<string, { breakfast: string; lunch: string; dinner: string }>;

const initialMeals: MealPlan = {
  Monday: { breakfast: "Oatmeal", lunch: "Chicken wrap", dinner: "Pasta" },
  Tuesday: { breakfast: "Yogurt", lunch: "Soup & bread", dinner: "Stir fry" },
  Wednesday: { breakfast: "Smoothie", lunch: "Salad bowl", dinner: "Tacos" },
  Thursday: { breakfast: "", lunch: "", dinner: "" },
  Friday: { breakfast: "", lunch: "", dinner: "" },
  Saturday: { breakfast: "", lunch: "", dinner: "" },
  Sunday: { breakfast: "", lunch: "", dinner: "" },
};

const MealPlanner = () => {
  const [meals] = useState(initialMeals);

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <PageHeader title="Meal Planner" />

      {days.map((day) => (
        <AppCard key={day}>
          <h2 className="text-sm font-semibold text-foreground mb-2">{day}</h2>
          <div className="space-y-1.5">
            {(["breakfast", "lunch", "dinner"] as const).map((meal) => (
              <div key={meal} className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground w-16 capitalize">{meal}</span>
                <span className="text-sm text-foreground">
                  {meals[day][meal] || <span className="text-muted-foreground italic">—</span>}
                </span>
              </div>
            ))}
          </div>
        </AppCard>
      ))}

      <ActionButton fullWidth>
        <Plus size={16} /> Add Meal
      </ActionButton>
    </div>
  );
};

export default MealPlanner;
