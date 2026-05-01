import { useEffect, useId, useRef, type ReactNode } from "react";
import { Card, CardHeader } from "@/components/ui/Card";

interface BottomSheetDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export const BottomSheetDialog = ({
  open,
  title,
  onClose,
  children,
}: BottomSheetDialogProps) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => panelRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousFocus.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-end justify-center
        bg-foreground/30 backdrop-blur-sm
        animate-in fade-in
      "
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="
          w-full max-w-md
          animate-in slide-in-from-bottom duration-200
          focus:outline-none
        "
        onClick={(event) => event.stopPropagation()}
      >
        <Card className="overflow-hidden rounded-t-3xl shadow-none">

          {/* HEADER */}
          <CardHeader title={title} id={titleId} />

          {/* CONTENT SYSTEM */}
          <div className="flex flex-col max-h-[85vh]">

            {/* SCROLLABLE AREA */}
            <div
              className="
                flex-1
                overflow-y-auto
                px-4 py-4
                pb-[calc(96px+env(safe-area-inset-bottom))]
              "
            >
              {children}
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
};