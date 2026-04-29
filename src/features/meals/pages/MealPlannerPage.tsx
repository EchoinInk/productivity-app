import { useState } from "react";
import { Plus } from "lucide-react";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import ActionButton from "@/components/ActionButton";
import Header from "@/components/Header";
import AddMeal from "@/components/modal/AddMeal";
import EmptyState from "@/components/ui/EmptyState";
import { UIText } from "@/components/ui/Text";

import { weekdays } from "@/features/meals/constants/weekdays";
import { useMealsStore } from "@/features/meals/store/useMealsStore";
import { useMealsByDay, selectAddMeal } from "@/features/meals/selectors/mealsSelectors";

const MealPlannerPage = () => {
  const addMeal = useMealsStore(selectAddMeal);
  const mealsByDay = useMealsByDay();

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <Header title="Meal Planner" />

        {weekdays.map((day) => {
          const dayMeals = mealsByDay[day] ?? [];

          return (
            <Card key={day}>
              <CardHeader title={day} />
              <CardBody>
                {dayMeals.length === 0 ? (
                  <EmptyState
                    title="No meals planned"
                    description="Add a meal for this day"
                    className="py-4"
                  />
                ) : (
                  <div className="space-y-2">
                    {dayMeals.map((meal) => (
                      <UIText.Body key={meal.id}>
                        {meal.name}
                      </UIText.Body>
                    ))}
                  </div>
                )}
              </CardBody>
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
    </>
  );
};

export default MealPlannerPage;