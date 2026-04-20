import { useState } from "react";
import AppCard from "@/components/AppCard";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import { Plus } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import AddMeal from "@/components/modal/AddMeal";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const MealPlanner = () => {
  const meals = useAppStore((s) => s.meals);
  const addMeal = useAppStore((s) => s.addMeal);
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4 pb-24 max-w-lg mx-auto space-y-4">
      <PageHeader title="Meal Planner" />

      {days.map((day) => {
        const dayMeals = meals.filter((m) => m.day === day);
        return (
          <AppCard key={day}>
            <h2 className="text-sm font-semibold text-foreground mb-2">{day}</h2>
            <div className="space-y-1.5">
              {dayMeals.length === 0 ? (
                <span className="text-sm text-muted-foreground italic">No meals planned</span>
              ) : (
                dayMeals.map((m) => (
                  <div key={m.id} className="text-sm text-foreground">
                    {m.name}
                  </div>
                ))
              )}
            </div>
          </AppCard>
        );
      })}

      <ActionButton fullWidth onClick={() => setOpen(true)}>
        <Plus size={16} /> Add Meal
      </ActionButton>

      <AddMeal
        open={open}
        onClose={() => setOpen(false)}
        onSave={(m) => addMeal(m.name, m.day)}
      />
    </div>
  );
};

export default MealPlanner;
