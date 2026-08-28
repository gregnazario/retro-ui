<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    tabs,
    defaultTab,
  }: { tabs: Array<{ id: string; label: string; content?: Snippet }>; defaultTab?: string } =
    $props();

  // svelte-ignore state_referenced_locally
  // The initial tab is deliberately captured once, matching React's
  // useState(defaultTab ?? first) semantics.
  let active = $state(defaultTab ?? tabs[0]?.id);
</script>

<div class="retro-tabs">
  <div class="retro-tablist" role="tablist">
    {#each tabs as tab (tab.id)}
      <button
        type="button"
        role="tab"
        class="retro-tab"
        aria-selected={tab.id === active}
        onclick={() => (active = tab.id)}
      >
        {tab.label}
      </button>
    {/each}
  </div>
  {#each tabs as tab (tab.id)}
    {#if tab.id === active}
      <div role="tabpanel" class="retro-tabpanel">{@render tab.content?.()}</div>
    {/if}
  {/each}
</div>
