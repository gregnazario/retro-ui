import { inject, unref, type ComputedRef } from "vue";
import type { RetroTheme } from "@retro-ui/themes";

export const RETRO_THEME_KEY = "retro-ui:theme";

export function useRetroTheme(): RetroTheme {
  const theme = inject<ComputedRef<RetroTheme> | null>(RETRO_THEME_KEY, null);
  if (!theme) {
    throw new Error("useRetroTheme must be used within <RetroProvider>");
  }
  return unref(theme);
}
