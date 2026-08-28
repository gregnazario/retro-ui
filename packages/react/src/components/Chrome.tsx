import type { CSSProperties, HTMLAttributes, InputHTMLAttributes, PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useRef, useState } from "react";
import { TitleButton } from "./Button";
import { cx } from "../cx";
import { useRetroTheme } from "../provider";
import { bumpWindowStack } from "../windowStack";

export function Window({
  title,
  active = true,
  status,
  className,
  children,
  style,
  width,
  draggable = true,
}: {
  title: string;
  active?: boolean;
  status?: ReactNode;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  width?: number | string;
  draggable?: boolean;
}) {
  const theme = useRetroTheme();
  const showControls = theme.controls !== "none";
  const windowRef = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragState = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
  } | null>(null);

  function bringToFront() {
    if (windowRef.current) {
      windowRef.current.style.zIndex = String(bumpWindowStack());
    }
  }

  function onTitlePointerDown(event: ReactPointerEvent<HTMLElement>) {
    if (!draggable || event.button !== 0) return;
    if ((event.target as HTMLElement).closest(".retro-titlebar-controls button")) return;
    bringToFront();
    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      baseX: offset.x,
      baseY: offset.y,
    };
    try {
      event.currentTarget.setPointerCapture?.(event.pointerId);
    } catch {
      /* pointer capture unavailable — drag ends on release anyway */
    }
  }

  function onTitlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    setOffset({
      x: drag.baseX + event.clientX - drag.startX,
      y: drag.baseY + event.clientY - drag.startY,
    });
  }

  function endDrag(event: ReactPointerEvent<HTMLElement>) {
    if (dragState.current?.pointerId === event.pointerId) {
      dragState.current = null;
    }
  }

  const dragStyle: CSSProperties = draggable
    ? { transform: `translate(${offset.x}px, ${offset.y}px)` }
    : {};

  return (
    <section
      ref={windowRef}
      className={cx("retro-window", className)}
      data-active={active}
      data-draggable={draggable}
      style={{ width, ...dragStyle, ...style }}
      onPointerDown={bringToFront}
    >
      <header
        className="retro-titlebar"
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
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
  const panel = taskbar ? (theme.taskbarPosition ?? "bottom") : "none";
  return (
    <div
      className={cx("retro-desktop", className)}
      data-pattern={theme.desktopPattern}
      data-panel={panel}
    >
      <div className="retro-desktop-stage">{children}</div>
      {taskbar}
    </div>
  );
}

export function TaskBar({
  startLabel = "Start",
  position,
  clock,
  children,
}: {
  startLabel?: string | null;
  position?: "top" | "bottom";
  clock?: ReactNode;
  children?: ReactNode;
}) {
  const theme = useRetroTheme();
  const resolvedPosition = position ?? theme.taskbarPosition ?? "bottom";
  return (
    <footer className="retro-taskbar" data-position={resolvedPosition}>
      {startLabel != null ? (
        <button type="button" className="retro-button retro-start">
          {startLabel}
        </button>
      ) : null}
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
