import type { ReactNode } from "react";

export function Tooltip({ text, children }: { text: string; children?: ReactNode }) {
  return (
    <span className="retro-tooltip" data-text={text}>
      {children}
    </span>
  );
}
