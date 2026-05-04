import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

export const FloatingAddButton = ({ onClick }: Props) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onClick}
        className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        aria-label="Add new task"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};
