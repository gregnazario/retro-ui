<script lang="ts">
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import type { RetroTheme } from "@retro-ui/themes";
  import { RETRO_THEME_KEY } from "../context";

  let {
    class: className = "",
    children,
    taskbar,
  }: { class?: string; children?: Snippet; taskbar?: Snippet } = $props();

  const theme = getContext<RetroTheme | undefined>(RETRO_THEME_KEY);
</script>

<div class="retro-desktop{className ? ` ${className}` : ""}" data-pattern={theme?.desktopPattern}>
  <div class="retro-desktop-stage">{@render children?.()}</div>
  {#if taskbar}{@render taskbar()}{/if}
</div>
