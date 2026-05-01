import { Button } from "@/components/ui/Button";

interface FormActionsProps {
  onCancel: () => void;
  submitLabel?: string;
  disabled?: boolean;
}

export const FormActions = ({ onCancel, submitLabel = "Save", disabled }: FormActionsProps) => {
  return (
    <div className="flex gap-2 px-4 py-2">
      <Button variant="secondary" fullWidth onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" fullWidth disabled={disabled}>
        {submitLabel}
      </Button>
    </div>
  );
};
