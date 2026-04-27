type Props = {
  id: string;
  title: string;
  subtitle: string;
  isCompleted: boolean;
  category: string | null;
  onToggleTask: () => void;
  onSelectTask: () => void;
};

export const TaskRowUI = memo((props: Props) => {
  const { id, title, subtitle, isCompleted, category, onToggleTask, onSelectTask } = props;

  const titleClassName = isCompleted
    ? "font-medium opacity-50 line-through"
    : "font-medium";

  return (
    <div onClick={onSelectTask}>
      <input type="checkbox" checked={isCompleted} onChange={onToggleTask} />
      <span className={titleClassName}>{title}</span>
      {subtitle && <span>{subtitle}</span>}
      {category && <span>{category}</span>}
    </div>
  );
});