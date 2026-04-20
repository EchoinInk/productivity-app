import { useState } from "react";
import AppCard from "@/components/AppCard";

const AddMeal = ({ open, onClose, onSave }: any) => {
  const [name, setName] = useState("");
  const [day, setDay] = useState("Today");

  if (!open) return null;

  return (
    <div className="modal">
      <AppCard className="space-y-4">
        <h2 className="text-lg font-semibold">Add Meal</h2>

        <input
          placeholder="Meal name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />

        <select value={day} onChange={(e) => setDay(e.target.value)} className="input">
          <option>Today</option>
          <option>Tomorrow</option>
        </select>

        <button onClick={() => onSave({ name, day })}>Save</button>
      </AppCard>
    </div>
  );
};

export default AddMeal;
