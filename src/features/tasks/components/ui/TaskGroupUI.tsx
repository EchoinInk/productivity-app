import { memo, type ReactNode } from "react";

import { UIText } from "@/components/ui/Text";

type TaskGroupUIProps = {
  title: string;
  children: ReactNode;
};

export const TaskGroupUI = memo(({ title, children }: TaskGroupUIProps) => (
  <div className="space-y-3">
    <UIText.Heading className="px-2">{title}</UIText.Heading>
    <div className="space-y-1">{children}</div>
  </div>
));

TaskGroupUI.displayName = "TaskGroupUI";
