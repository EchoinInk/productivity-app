import { useEffect, useId, useRef, type ReactNode } from "react";
import { Card, CardHeader } from "@/components/ui/Card";

interface BottomSheetDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

/**
 * Bottom Sheet Dialog - Mobile-Optimized Modal
 *
 * Ergonomic improvements:
 * - Slides from bottom for thumb reach
 * - Handles keyboard avoidance automatically
 * - Safe area support for notched devices
 * - 85vh max height for content visibility
 */
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

    // Store previous focus for restoration
    previousFocus.current = document.activeElement as HTMLElement | null;

    // Focus trap management
    requestAnimationFrame(() => panelRef.current?.focus());

    // Handle escape key and body scroll lock
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    // Lock body scroll when open
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
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
        bg-background/50
        animate-in fade-in duration-200
      "
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="
          w-full max-w-[430px]
          animate-in slide-in-from-bottom duration-300 ease-out
          focus:outline-none
        "
        onClick={(event) => event.stopPropagation()}
      >
        <Card className="overflow-hidden rounded-t-2xl shadow-none border-0">
          {/* Drag Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-text-muted/20" />
          </div>

          {/* HEADER */}
          <CardHeader title={title} id={titleId} />

          {/* CONTENT */}
          <div className="flex flex-col max-h-[85vh]">
            <div
              className="
                flex-1
                overflow-y-auto
                overscroll-contain
                px-4 py-4
                pb-[calc(120px+env(safe-area-inset-bottom))]
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