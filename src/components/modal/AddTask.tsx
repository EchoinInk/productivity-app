// ONLY CHANGES SHOWN

interface AddTaskProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: {
    label: string;
    date: string;
    time: string;
    type: string;
    recurrence: "none" | "weekly" | "monthly";
  }) => void;
}

const [recurrence, setRecurrence] = useState<"none" | "weekly" | "monthly">("none");

<select
  value={recurrence}
  onChange={(e) => setRecurrence(e.target.value as any)}
>
  <option value="none">None</option>
  <option value="weekly">Weekly</option>
  <option value="monthly">Monthly</option>
</select>

onSave({ label, date, time, type, recurrence });
