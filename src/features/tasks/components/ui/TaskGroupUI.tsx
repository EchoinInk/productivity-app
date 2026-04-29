import { memo, type ReactNode } from "react";

import { Heading } from "@/components/ui/Text";

type TaskGroupUIProps = {
  title: string;
  children: ReactNode;
};

export const TaskGroupUI = memo(({ title, children }: TaskGroupUIProps) => (
  <div className="space-y-3">
    <Heading className="px-2">{title}</Heading>
    <div className="space-y-1">{children}</div>
  </div>
));

TaskGroupUI.displayName = "TaskGroupUI";
