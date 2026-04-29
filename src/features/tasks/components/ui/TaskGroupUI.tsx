import { memo, type ReactNode } from "react";

import { UIText } from "@/components/ui/Text";

type TaskGroupUIProps = {
  title: string;
  children: ReactNode;
};

export const TaskGroupUI = memo(({ title, children }: TaskGroupUIProps) => (
  <div className="space-y-3">
    <UIText.HeadingM className="px-2">{title}</UIText.HeadingM>
    <div className="space-y-1">{children}</div>
  </div>
));

TaskGroupUI.displayName = "TaskGroupUI";
