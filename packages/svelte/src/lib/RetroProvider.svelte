<script lang="ts">
  import { setContext } from "svelte";
  import type { Snippet } from "svelte";
  import { getTheme, themeToCssVars, type RetroTheme } from "@gregnazario/retro-ui-themes";
  import { RETRO_THEME_KEY, type RetroThemeContext } from "../context";

  let {
    theme,
    class: className = "",
    children,
  }: {
    theme: RetroTheme | string;
    class?: string;
    children?: Snippet;
  } = $props();

  const resolved = $derived<RetroTheme>(typeof theme === "string" ? getTheme(theme) : theme);
  setContext<RetroThemeContext>(RETRO_THEME_KEY, {
    get current() {
      return resolved;
    },
  });

  const styleText = $derived(
    Object.entries(themeToCssVars(resolved))
      .map(([key, value]) => `${key}: ${value};`)
      .join(" "),
  );
</script>

<div
  class="retro-root {className}"
  data-theme={resolved.id}
  data-engine={resolved.engine}
  data-controls={resolved.controls}
  style={styleText}
>
  {@render children?.()}
</div>
