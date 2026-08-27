export type ChromeEngine =
  | "bevel"
  | "luna"
  | "aero"
  | "system7"
  | "platinum"
  | "aqua"
  | "nextstep"
  | "beos"
  | "amiga"
  | "pixel"
  | "terminal"
  | "web"
  | "soft"
  | "graphic";

export type WindowControls = "win" | "mac" | "next" | "beos" | "amiga" | "none";

export type DesktopPattern =
  | "none"
  | "tiles"
  | "stars"
  | "grid"
  | "scanlines"
  | "pinstripe"
  | "dots"
  | "checker"
  | "horizon"
  | "noise"
  | "halftone"
  | "perspective"
  | "weave";

export interface RetroTokens {
  desktop: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  textOnAccent: string;
  accent: string;
  accentHover: string;
  titlebarBg: string;
  titlebarText: string;
  titlebarInactiveBg: string;
  titlebarInactiveText: string;
  titleLabelBg: string;
  borderHigh: string;
  borderLight: string;
  borderDark: string;
  borderLow: string;
  fieldBg: string;
  fieldText: string;
  selectionBg: string;
  selectionText: string;
  focus: string;
  danger: string;
  success: string;
  warning: string;
  disabled: string;
  disabledText: string;
  controlBg: string;
  controlBgHover: string;
  controlBgActive: string;
  controlBgPrimary: string;
  controlTextPrimary: string;
  shadowOutset: string;
  shadowInset: string;
  shadowWindow: string;
  radius: string;
  radiusWindow: string;
  radiusControl: string;
  borderWidth: string;
  fontSize: string;
  lineHeight: string;
  controlHeight: string;
  titlebarHeight: string;
  space: string;
  letterSpacing: string;
}

export interface RetroTheme {
  id: string;
  slug: string;
  name: string;
  year: number;
  era: string;
  description: string;
  tags: string[];
  engine: ChromeEngine;
  controls: WindowControls;
  desktopPattern: DesktopPattern;
  fonts: {
    ui: string;
    mono: string;
    display: string;
  };
  tokens: RetroTokens;
}

export const TOKEN_KEYS = [
  "desktop",
  "surface",
  "surfaceAlt",
  "text",
  "textMuted",
  "textOnAccent",
  "accent",
  "accentHover",
  "titlebarBg",
  "titlebarText",
  "titlebarInactiveBg",
  "titlebarInactiveText",
  "titleLabelBg",
  "borderHigh",
  "borderLight",
  "borderDark",
  "borderLow",
  "fieldBg",
  "fieldText",
  "selectionBg",
  "selectionText",
  "focus",
  "danger",
  "success",
  "warning",
  "disabled",
  "disabledText",
  "controlBg",
  "controlBgHover",
  "controlBgActive",
  "controlBgPrimary",
  "controlTextPrimary",
  "shadowOutset",
  "shadowInset",
  "shadowWindow",
  "radius",
  "radiusWindow",
  "radiusControl",
  "borderWidth",
  "fontSize",
  "lineHeight",
  "controlHeight",
  "titlebarHeight",
  "space",
  "letterSpacing",
] as const satisfies readonly (keyof RetroTokens)[];
