import { getContext } from "svelte";
import type { RetroTheme } from "@gregnazario/retro-ui-themes";

export const RETRO_THEME_KEY = "retro-ui:theme";

/**
 * Provided as a getter so consumers that read `.current` inside templates or
 * `$derived` expressions re-evaluate when the provider's theme prop changes.
 */
export interface RetroThemeContext {
  readonly current: RetroTheme;
}

export function useRetroTheme(): RetroTheme {
  const ctx = getContext<RetroThemeContext | undefined>(RETRO_THEME_KEY);
  if (!ctx) {
    throw new Error("useRetroTheme must be used within <RetroProvider>");
  }
  return ctx.current;
}
