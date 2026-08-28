<script lang="ts">
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import { RETRO_THEME_KEY, type RetroThemeContext } from "../context";

  let {
    startLabel = "Start",
    position,
    children,
    clock,
  }: {
    startLabel?: string | null;
    position?: "top" | "bottom";
    children?: Snippet;
    clock?: Snippet;
  } = $props();

  const themeCtx = getContext<RetroThemeContext | undefined>(RETRO_THEME_KEY);
  const resolvedPosition = $derived(
    position ?? themeCtx?.current.taskbarPosition ?? "bottom",
  );
</script>

<footer class="retro-taskbar" data-position={resolvedPosition}>
  {#if startLabel != null}
    <button type="button" class="retro-button retro-start">{startLabel}</button>
  {/if}
  {@render children?.()}
  {#if clock}<div class="retro-clock">{@render clock()}</div>{/if}
</footer>
