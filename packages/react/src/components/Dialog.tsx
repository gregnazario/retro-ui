import { useEffect } from "react";
import type { ReactNode } from "react";
import { Window } from "./Chrome";
import { cx } from "../cx";

export function Dialog({
  open,
  title,
  onClose,
  closeOnBackdrop = true,
  width,
  className,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  closeOnBackdrop?: boolean;
  width?: number | string;
  className?: string;
  children?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="retro-dialog-backdrop"
      onPointerDown={(event) => {
        if (closeOnBackdrop && event.target === event.currentTarget) onClose();
      }}
    >
      <div className="retro-dialog-wrap" role="dialog" aria-modal="true" aria-label={title}>
        <Window
          title={title}
          width={width}
          className={cx("retro-dialog", className)}
          draggable={false}
        >
          {children}
        </Window>
      </div>
    </div>
  );
}
