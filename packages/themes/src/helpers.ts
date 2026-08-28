import type { RetroTheme, RetroTokens } from "./types";

export const tahomaStack = `Tahoma, "MS Sans Serif", "Segoe UI", sans-serif`;
export const chicagoStack = `Chicago, Charcoal, Geneva, Tahoma, sans-serif`;
export const lucidaStack = `"Lucida Grande", "Lucida Sans Unicode", "Helvetica Neue", Helvetica, sans-serif`;
export const genevaStack = `Geneva, Helvetica, Arial, sans-serif`;
export const monoStack = `"IBM Plex Mono", "Share Tech Mono", ui-monospace, Menlo, Consolas, monospace`;
export const pixelStack = `"Press Start 2P", Silkscreen, "IBM Plex Mono", monospace`;
export const vtStack = `"VT323", "Share Tech Mono", ui-monospace, monospace`;
export const helveticaStack = `"Helvetica Neue", Helvetica, Arial, sans-serif`;
export const serifStack = `"Source Serif 4", "Times New Roman", Times, serif`;
export const comicStack = `"Comic Neue", "Comic Sans MS", cursive, sans-serif`;
export const displayStack = `"Archivo Black", "Arial Black", Impact, sans-serif`;
export const orbitronStack = `Orbitron, "Segoe UI", sans-serif`;
export const plexSans = `"IBM Plex Sans", "Segoe UI", sans-serif`;

export const bevelWin95: RetroTokens = {
  desktop: "#008080",
  surface: "#c0c0c0",
  surfaceAlt: "#dfdfdf",
  text: "#000000",
  textMuted: "#404040",
  textOnAccent: "#ffffff",
  accent: "#000080",
  accentHover: "#0000a0",
  titlebarBg: "#000080",
  titlebarText: "#ffffff",
  titlebarInactiveBg: "#808080",
  titlebarInactiveText: "#c0c0c0",
  titleLabelBg: "transparent",
  borderHigh: "#ffffff",
  borderLight: "#dfdfdf",
  borderDark: "#808080",
  borderLow: "#000000",
  fieldBg: "#ffffff",
  fieldText: "#000000",
  selectionBg: "#000080",
  selectionText: "#ffffff",
  focus: "#000000",
  danger: "#800000",
  success: "#008000",
  warning: "#808000",
  disabled: "#c0c0c0",
  disabledText: "#808080",
  controlBg: "#c0c0c0",
  controlBgHover: "#dfdfdf",
  controlBgActive: "#c0c0c0",
  controlBgPrimary: "#c0c0c0",
  controlTextPrimary: "#000000",
  shadowOutset: "inset -1px -1px #000000, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf",
  shadowInset: "inset -1px -1px #ffffff, inset 1px 1px #000000, inset -2px -2px #dfdfdf, inset 2px 2px #808080",
  shadowWindow: "1px 1px 0 #000000",
  radius: "0px",
  radiusWindow: "0px",
  radiusControl: "0px",
  borderWidth: "0px",
  fontSize: "12px",
  lineHeight: "1.25",
  controlHeight: "23px",
  titlebarHeight: "18px",
  space: "8px",
  letterSpacing: "0",
};

export const terminalBase: RetroTokens = {
  desktop: "#001800",
  surface: "#001800",
  surfaceAlt: "#003000",
  text: "#33ff33",
  textMuted: "#1a8a1a",
  textOnAccent: "#001800",
  accent: "#33ff33",
  accentHover: "#66ff66",
  titlebarBg: "#001800",
  titlebarText: "#33ff33",
  titlebarInactiveBg: "#001000",
  titlebarInactiveText: "#1a8a1a",
  titleLabelBg: "transparent",
  borderHigh: "#33ff33",
  borderLight: "#1a8a1a",
  borderDark: "#1a8a1a",
  borderLow: "#33ff33",
  fieldBg: "#000800",
  fieldText: "#33ff33",
  selectionBg: "#33ff33",
  selectionText: "#001800",
  focus: "#aaffaa",
  danger: "#ff4040",
  success: "#33ff33",
  warning: "#ffb400",
  disabled: "#003000",
  disabledText: "#1a8a1a",
  controlBg: "#001800",
  controlBgHover: "#003000",
  controlBgActive: "#004400",
  controlBgPrimary: "#33ff33",
  controlTextPrimary: "#001800",
  shadowOutset: "none",
  shadowInset: "none",
  shadowWindow: "0 0 18px rgba(51, 255, 51, 0.25)",
  radius: "0px",
  radiusWindow: "0px",
  radiusControl: "0px",
  borderWidth: "1px",
  fontSize: "16px",
  lineHeight: "1.35",
  controlHeight: "28px",
  titlebarHeight: "24px",
  space: "10px",
  letterSpacing: "0.04em",
};

export function defineTheme(
  theme: Omit<RetroTheme, "tokens"> & { tokens: Partial<RetroTokens> },
  base: RetroTokens = bevelWin95,
): RetroTheme {
  return {
    taskbarPosition: "bottom",
    ...theme,
    tokens: { ...base, ...theme.tokens },
  };
}
