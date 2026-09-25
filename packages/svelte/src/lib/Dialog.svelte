<script lang="ts">
  import type { Snippet } from "svelte";
  import Window from "./Window.svelte";

  let {
    open,
    title,
    onClose,
    closeOnBackdrop = true,
    width,
    children,
  }: {
    open: boolean;
    title: string;
    onClose: () => void;
    closeOnBackdrop?: boolean;
    width?: number | string;
    children?: Snippet;
  } = $props();

  function onKey(event: KeyboardEvent) {
    if (event.key === "Escape") onClose();
  }

  $effect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });
</script>

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- Backdrop click-through is pointer-only; Escape closes for keyboards. -->
  <div
    class="retro-dialog-backdrop"
    onpointerdown={(event) => {
      if (closeOnBackdrop && event.target === event.currentTarget) onClose();
    }}
  >
    <div role="dialog" aria-modal="true" aria-label={title} class="retro-dialog-wrap">
      <Window {title} {width} class="retro-dialog" draggable={false}>
        {@render children?.()}
      </Window>
    </div>
  </div>
{/if}
