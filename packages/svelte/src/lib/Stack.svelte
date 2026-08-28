<script lang="ts">
  import type { Snippet } from "svelte";

  let { class: className = "", children }: { class?: string; children?: Snippet } = $props();
</script>

<div class={`retro-stack${className ? ` ${className}` : ""}`}>{@render children?.()}</div>
