import { useState } from "react";
import { Plus } from "lucide-react";

import { Card } from "@/components/ui/Card";
import ActionButton from "@/components/ActionButton";
import PageHeader from "@/components/PageHeader";
import AddMeal from "@/components/modal/AddMeal";
import PageShell from "@/app/layout/PageShell";
import EmptyState from "@/components/ui/EmptyState";
import { UIText } from "@/components/ui/Text";

import { weekdays } from "@/features/meals/constants/weekdays";
import { useMealsStore } from "@/features/meals/store/useMealsStore";

const MealPlannerPage = () => {
  const meals = useMealsStore((s) => s.meals);
  const addMeal = useMealsStore((s) => s.addMeal);

  const [open, setOpen] = useState(false);

  return (
    <PageShell>
      <div className="space-y-4">
        <PageHeader title="Meal Planner" />

        {weekdays.map((day) => {
          const dayMeals = meals.filter((meal) => meal.day === day);

          return (
            <Card key={day}>
              <UIText.Section className="mb-2">
                {day}
              </UIText.Section>

              {dayMeals.length === 0 ? (
                <EmptyState
                  title="No meals planned"
                  description="Add a meal for this day"
                  className="py-4"
                />
              ) : (
                <div className="space-y-1">
                  {dayMeals.map((meal) => (
                    <UIText.Body key={meal.id}>
                      {meal.name}
                    </UIText.Body>
                  ))}
                </div>
              )}
            </Card>
          );
        })}

        <ActionButton fullWidth onClick={() => setOpen(true)}>
          <Plus size={16} /> Add Meal
        </ActionButton>
      </div>

      {/* MODAL OUTSIDE */}
      <AddMeal
        open={open}
        onClose={() => setOpen(false)}
        onSave={addMeal}
      />
    </PageShell>
  );
};

export default MealPlannerPage;