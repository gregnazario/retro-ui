<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    startLabel = "Start",
    children,
    clock,
  }: { startLabel?: string; children?: Snippet; clock?: Snippet } = $props();
</script>

<footer class="retro-taskbar">
  <button type="button" class="retro-button retro-start">{startLabel}</button>
  {@render children?.()}
  {#if clock}<div class="retro-clock">{@render clock()}</div>{/if}
</footer>
