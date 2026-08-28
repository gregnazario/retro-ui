import {
  createContext,
  useContext,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  getTheme,
  themeToCssVars,
  type RetroTheme,
} from "@retro-ui/themes";
import "@retro-ui/styles/retro.css";

const ThemeContext = createContext<RetroTheme | null>(null);

export function useRetroTheme(): RetroTheme {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useRetroTheme must be used within <RetroProvider>");
  }
  return theme;
}

export function RetroProvider({
  theme,
  children,
  className,
}: {
  theme: RetroTheme | string;
  children: ReactNode;
  className?: string;
}) {
  const resolved = useMemo(
    () => (typeof theme === "string" ? getTheme(theme) : theme),
    [theme],
  );
  const style = useMemo(
    () => themeToCssVars(resolved) as CSSProperties,
    [resolved],
  );

  return (
    <ThemeContext.Provider value={resolved}>
      <div
        className={["retro-root", className].filter(Boolean).join(" ")}
        data-theme={resolved.id}
        data-engine={resolved.engine}
        data-controls={resolved.controls}
        style={style}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
