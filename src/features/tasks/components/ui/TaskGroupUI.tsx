import { memo, type ReactNode } from "react";

import { UIText } from "@/components/ui/Text";

type TaskGroupUIProps = {
  title: string;
  children: ReactNode;
};

export const TaskGroupUI = memo(({ title, children }: TaskGroupUIProps) => (
  <div className="space-y-2">
    <UIText.HeadingM>{title}</UIText.HeadingM>
    <div className="space-y-2">{children}</div>
  </div>
));

TaskGroupUI.displayName = "TaskGroupUI";
