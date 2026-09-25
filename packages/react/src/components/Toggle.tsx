import { cx } from "../cx";

export function Toggle({
  label,
  checked,
  disabled,
  onChange,
  className,
}: {
  label?: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
  className?: string;
}) {
  const control = (
    <button
      type="button"
      role="switch"
      className="retro-toggle-track"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
    >
      <span className="retro-toggle-thumb" />
    </button>
  );

  if (!label) return control;

  return (
    <label className={cx("retro-toggle", className)}>
      {control}
      <span>{label}</span>
    </label>
  );
}
