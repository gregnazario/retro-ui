import { aestheticThemes } from "./aesthetic";
import { consoleThemes } from "./console";
import { cultOsThemes } from "./cult-os";
import { desktopOsThemes } from "./desktop-os";
import { mobileThemes } from "./mobile";
import { gamingThemes } from "./gaming";
import { terminalThemes } from "./terminal";
import type { RetroTheme, RetroTokens } from "./types";
import { webUiThemes } from "./web-ui";

export const themes: RetroTheme[] = [
  ...desktopOsThemes,
  ...cultOsThemes,
  ...mobileThemes,
  ...consoleThemes,
  ...terminalThemes,
  ...gamingThemes,
  ...webUiThemes,
  ...aestheticThemes,
];

const byId = new Map(themes.map((theme) => [theme.id, theme]));
const bySlug = new Map(themes.map((theme) => [theme.slug, theme]));

export function getTheme(idOrSlug: string): RetroTheme {
  const theme = byId.get(idOrSlug) ?? bySlug.get(idOrSlug);
  if (!theme) {
    throw new Error(`Unknown retro-ui theme: ${idOrSlug}`);
  }
  return theme;
}

export function listThemes(): RetroTheme[] {
  return themes;
}

export function themesByEra(): Map<string, RetroTheme[]> {
  const grouped = new Map<string, RetroTheme[]>();
  for (const theme of themes) {
    const list = grouped.get(theme.era) ?? [];
    list.push(theme);
    grouped.set(theme.era, list);
  }
  return grouped;
}

export function tokenToCssVar(key: keyof RetroTokens): string {
  return `--retro-${key.replace(/[A-Z]/g, (ch) => `-${ch.toLowerCase()}`)}`;
}

export function themeToCssVars(theme: RetroTheme): Record<string, string> {
  const vars: Record<string, string> = {
    "--retro-font-ui": theme.fonts.ui,
    "--retro-font-mono": theme.fonts.mono,
    "--retro-font-display": theme.fonts.display,
  };
  for (const [key, value] of Object.entries(theme.tokens) as [keyof RetroTokens, string][]) {
    vars[tokenToCssVar(key)] = value;
  }
  return vars;
}

export function themeToStyle(theme: RetroTheme): string {
  const vars = themeToCssVars(theme);
  const body = Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");
  return `.retro-root[data-theme="${theme.id}"] {\n${body}\n}\n`;
}

export const EXPECTED_STYLE_IDS = [
  "mac-system-7",
  "windows-3-1",
  "windows-95",
  "windows-98",
  "windows-2000",
  "windows-xp-luna",
  "windows-vista",
  "windows-7-aero",
  "windows-11",
  "xerox-star",
  "atari-tos",
  "palm-os",
  "risc-os",
  "open-look",
  "windows-phone-metro",
  "ios-6",
  "ios-7",
  "android-holo",
  "blackberry-os",
  "symbian-s60",
  "palm-webos",
  "windows-mobile",
  "newton-os",
  "magic-cap",
  "ps3-xmb",
  "xbox-blades",
  "wii-menu",
  "switch-home",
  "serenityos",
  "haiku-os",
  "elementary-os",
  "ubuntu-unity",
  "longhorn",
  "geos",
  "plan-9",
  "persona-5",
  "diablo-2",
  "ff-ps1",
  "portal-aperture",
  "myst",
  "art-deco",
  "phpbb-forum",
  "myspace-profile",
  "limewire",
  "quicktime-4",
  "meego-n9",
  "skeuomorphic-2010",
  "material-design",
  "material-you",
  "bootstrap-3",
  "modern-saas",
  "ai-chat",
  "msn-messenger",
  "aim",
  "mirc",
  "aqua-osx",
  "macos-big-sur",
  "amiga-workbench",
  "amigaos-4",
  "nextstep",
  "beos",
  "os2-warp",
  "macos9-platinum",
  "cde-motif",
  "classic-gnome",
  "gnome-40",
  "kde-3",
  "kde-plasma",
  "xfce-4",
  "unix-x11",
  "liquid-glass",
  "templeos",
  "teletext",
  "crt-phosphor",
  "dos-cga",
  "ibm-3270",
  "nethack-ascii",
  "bbs-ansi",
  "midnight-commander",
  "matrix-rain",
  "btop-meters",
  "c64-basic",
  "turbo-vision",
  "genera",
  "8bit-arcade",
  "winamp-skin",
  "ps1-tech",
  "gameboy-dmg",
  "red-alert",
  "warcraft-2",
  "pip-boy",
  "doom-hud",
  "scumm",
  "geocities-web10",
  "web20-glossy",
  "frutiger-aero",
  "flat-2013",
  "glassmorphism",
  "neumorphism",
  "claymorphism",
  "brutalist-web",
  "default-browser",
  "y2k-chrome",
  "maximalist-banners",
  "cassette-futurism",
  "jurassic-park-unix",
  "lcars",
  "wargames-wopr",
  "vaporwave",
  "memphis",
  "braun-rams",
  "tron-vector",
  "vhs-tracking",
  "risograph",
  "blueprint-cad",
  "swiss-intl",
  "bauhaus",
  "pop-art",
  "op-art",
  "hypnagogic",
  "monochrome-zen",
  "wireframe-sketch",
  "glitch-databend",
  "duotone-poster",
  "grid-paper",
  "grunge-90s",
  "corporate-memphis",
  "solarpunk",
  "teenage-engineering",
] as const;

export type ExpectedStyleId = (typeof EXPECTED_STYLE_IDS)[number];
