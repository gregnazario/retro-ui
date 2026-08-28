<script lang="ts">
  import type { Snippet } from "svelte";

  let { items }: { items: Array<string | Snippet> } = $props();
</script>

<div class="retro-statusbar">
  {#each items as item, index (index)}
    <div>
      {#if typeof item === "string"}{item}{:else}{@render item()}{/if}
    </div>
  {/each}
</div>
