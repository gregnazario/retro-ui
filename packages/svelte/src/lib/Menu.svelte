<script lang="ts">
  let {
    label,
    items,
  }: {
    label: string;
    items: Array<{ label: string; onClick?: () => void; disabled?: boolean }>;
  } = $props();

  let open = $state(false);
  let root: HTMLElement | undefined = $state();

  function onDocPointerDown(event: PointerEvent) {
    if (!root?.contains(event.target as Node)) open = false;
  }

  function onKey(event: KeyboardEvent) {
    if (event.key === "Escape") open = false;
  }

  $effect(() => {
    if (!open) return;
    document.addEventListener("pointerdown", onDocPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDocPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  });
</script>

<div bind:this={root} class="retro-menu">
  <button
    type="button"
    class="retro-button"
    aria-haspopup="menu"
    aria-expanded={open}
    onclick={() => (open = !open)}
  >
    {label}
  </button>
  {#if open}
    <div class="retro-menu-popup" role="menu">
      {#each items as item (item.label)}
        <button
          type="button"
          role="menuitem"
          disabled={item.disabled}
          onclick={() => {
            open = false;
            item.onClick?.();
          }}
        >
          {item.label}
        </button>
      {/each}
    </div>
  {/if}
</div>
