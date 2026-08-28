<script lang="ts">
  import type { Snippet } from "svelte";

  let { title, children }: { title: string; children?: Snippet } = $props();
</script>

<div class="retro-alert" role="status">
  <strong>{title}</strong>
  {#if children}<div>{@render children()}</div>{/if}
</div>
