import type { CSSProperties, HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";
import { TitleButton } from "./Button";
import { cx } from "../cx";
import { useRetroTheme } from "../provider";

export function Window({
  title,
  active = true,
  status,
  className,
  children,
  style,
  width,
}: {
  title: string;
  active?: boolean;
  status?: ReactNode;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  width?: number | string;
}) {
  const theme = useRetroTheme();
  const showControls = theme.controls !== "none";

  return (
    <section
      className={cx("retro-window", className)}
      data-active={active}
      style={{ width, ...style }}
    >
      <header className="retro-titlebar">
        {showControls && theme.controls === "mac" ? (
          <div className="retro-titlebar-controls">
            <TitleButton kind="close" />
            <TitleButton kind="min" />
            <TitleButton kind="max" />
          </div>
        ) : null}
        <div className="retro-titlebar-title">{title}</div>
        {showControls && theme.controls !== "mac" ? (
          <div className="retro-titlebar-controls">
            <TitleButton kind="min" />
            <TitleButton kind="max" />
            <TitleButton kind="close" />
          </div>
        ) : null}
      </header>
      <div className="retro-window-body">{children}</div>
      {status ? <div className="retro-window-status">{status}</div> : null}
    </section>
  );
}

export function Desktop({
  children,
  taskbar,
  className,
}: {
  children?: ReactNode;
  taskbar?: ReactNode;
  className?: string;
}) {
  const theme = useRetroTheme();
  return (
    <div className={cx("retro-desktop", className)} data-pattern={theme.desktopPattern}>
      <div className="retro-desktop-stage">{children}</div>
      {taskbar}
    </div>
  );
}

export function TaskBar({
  startLabel = "Start",
  clock,
  children,
}: {
  startLabel?: string;
  clock?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <footer className="retro-taskbar">
      <button type="button" className="retro-button retro-start">
        {startLabel}
      </button>
      {children}
      {clock ? <div className="retro-clock">{clock}</div> : null}
    </footer>
  );
}

export function Fieldset({
  legend,
  children,
  className,
}: {
  legend: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <fieldset className={cx("retro-fieldset", className)}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
}

export function MenuBar({
  items,
}: {
  items: Array<{ label: string; onClick?: () => void }>;
}) {
  return (
    <nav className="retro-menubar" aria-label="Menu bar">
      {items.map((item) => (
        <button key={item.label} type="button" className="retro-menuitem" onClick={item.onClick}>
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export function StatusBar({ items }: { items: ReactNode[] }) {
  return (
    <div className="retro-statusbar">
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
}

export function Separator({ className }: { className?: string }) {
  return <hr className={cx("retro-separator", className)} />;
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="retro-badge">{children}</span>;
}

export function Alert({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="retro-alert" role="status">
      <strong>{title}</strong>
      {children ? <div>{children}</div> : null}
    </div>
  );
}

export function Progress({ value, label }: { value: number; label?: string }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className="retro-progress"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="retro-progress-bar" style={{ width: `${clamped}%` }} />
    </div>
  );
}

export function Slider(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input type="range" className="retro-slider" {...props} />;
}

export function Row({ children }: { children?: ReactNode }) {
  return <div className="retro-row">{children}</div>;
}

export function Stack({ children, className }: { children?: ReactNode; className?: string }) {
  return <div className={cx("retro-stack", className)}>{children}</div>;
}

export function Swatch({ color, title }: { color: string; title?: string }) {
  return (
    <span
      className="retro-swatch"
      title={title ?? color}
      style={{ background: color }}
    />
  );
}

export function Group({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}
