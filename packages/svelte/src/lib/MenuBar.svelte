<script lang="ts">
  let { items }: { items: Array<{ label: string; onClick?: () => void }> } = $props();
</script>

<nav class="retro-menubar" aria-label="Menu bar">
  {#each items as item (item.label)}
    <button type="button" class="retro-menuitem" onclick={item.onClick}>{item.label}</button>
  {/each}
</nav>
