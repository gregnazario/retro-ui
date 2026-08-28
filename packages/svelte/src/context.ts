import { getContext } from "svelte";
import type { RetroTheme } from "@retro-ui/themes";

export const RETRO_THEME_KEY = "retro-ui:theme";

export function useRetroTheme(): RetroTheme {
  const theme = getContext<RetroTheme | undefined>(RETRO_THEME_KEY);
  if (!theme) {
    throw new Error("useRetroTheme must be used within <RetroProvider>");
  }
  return theme;
}
