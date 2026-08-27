import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../cx";

export function Button({
  variant = "default",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary";
}) {
  return (
    <button
      type="button"
      className={cx(
        "retro-button",
        variant === "primary" && "retro-button-primary",
        className,
      )}
      {...props}
    />
  );
}

export function TitleButton({
  kind,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  kind: "min" | "max" | "close";
  children?: ReactNode;
}) {
  const fallback = kind === "min" ? "–" : kind === "max" ? "□" : "×";
  return (
    <button
      type="button"
      aria-label={kind === "min" ? "Minimize" : kind === "max" ? "Maximize" : "Close"}
      className={cx("retro-button", "retro-ctrl", kind)}
      {...props}
    >
      {children ?? fallback}
    </button>
  );
}
