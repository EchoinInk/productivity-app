import { Button } from "@/shared/ui/Button";

interface FormActionsProps {
  onCancel: () => void;
  submitLabel?: string;
  disabled?: boolean;
}

export const FormActions = ({ onCancel, submitLabel = "Save", disabled }: FormActionsProps) => (
  <div className="flex gap-2 pt-2">
    <Button variant="secondary" fullWidth onClick={onCancel}>
      Cancel
    </Button>
    <Button type="submit" fullWidth disabled={disabled}>
      {submitLabel}
    </Button>
  </div>
);
