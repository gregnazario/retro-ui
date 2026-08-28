<script lang="ts">
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import { RETRO_THEME_KEY, type RetroThemeContext } from "../context";

  let {
    class: className = "",
    children,
    taskbar,
  }: { class?: string; children?: Snippet; taskbar?: Snippet } = $props();

  const themeCtx = getContext<RetroThemeContext | undefined>(RETRO_THEME_KEY);
  const panel = $derived(
    taskbar ? (themeCtx?.current.taskbarPosition ?? "bottom") : "none",
  );
</script>

<div
  class={`retro-desktop${className ? ` ${className}` : ""}`}
  data-pattern={themeCtx?.current.desktopPattern}
  data-panel={panel}
>
  <div class="retro-desktop-stage">{@render children?.()}</div>
  {#if taskbar}{@render taskbar()}{/if}
</div>
