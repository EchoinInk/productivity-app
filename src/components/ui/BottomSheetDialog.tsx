import { useEffect, useId, useRef, type ReactNode } from "react";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";

interface BottomSheetDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export const BottomSheetDialog = ({ open, title, onClose, children }: BottomSheetDialogProps) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => panelRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
      previousFocus.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/30 p-4 backdrop-blur-sm animate-in fade-in" onMouseDown={onClose}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="w-full max-w-md animate-in slide-in-from-bottom duration-200 focus:outline-none"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <Card className="space-y-4">
          <CardHeader title={title} />
          <CardBody>
            {children}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
