import { useState } from "react";
import { Plus } from "lucide-react";
import AppCard from "@/components/AppCard";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import AddMeal from "@/components/modal/AddMeal";
import PageShell from "@/app/layout/PageShell";
import { weekdays } from "@/features/meals/constants/weekdays";
import { useMealsStore } from "@/features/meals/store/useMealsStore";

const MealPlannerPage = () => {
  const meals = useMealsStore((s) => s.meals);
  const addMeal = useMealsStore((s) => s.addMeal);
  const [open, setOpen] = useState(false);

  return (
    <PageShell>
      <PageHeader title="Meal Planner" />
      {weekdays.map((day) => {
        const dayMeals = meals.filter((meal) => meal.day === day);
        return <AppCard key={day}><h2 className="text-sm font-semibold text-foreground mb-2">{day}</h2><div className="space-y-1.5">{dayMeals.length === 0 ? <span className="text-sm text-muted-foreground italic">No meals planned</span> : dayMeals.map((meal) => <div key={meal.id} className="text-sm text-foreground">{meal.name}</div>)}</div></AppCard>;
      })}
      <ActionButton fullWidth onClick={() => setOpen(true)}><Plus size={16} /> Add Meal</ActionButton>
      <AddMeal open={open} onClose={() => setOpen(false)} onSave={(meal) => addMeal(meal)} />
    </PageShell>
  );
};

export default MealPlannerPage;
