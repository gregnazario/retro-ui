<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  let {
    kind,
    class: className = "",
    children,
    ...rest
  }: HTMLButtonAttributes & {
    kind: "min" | "max" | "close";
    class?: string;
    children?: Snippet;
  } = $props();

  const fallback = $derived(kind === "min" ? "–" : kind === "max" ? "□" : "×");
</script>

<button
  type="button"
  aria-label={kind === "min" ? "Minimize" : kind === "max" ? "Maximize" : "Close"}
  {...rest}
  class="retro-button retro-ctrl {kind}{className ? ` ${className}` : ""}"
>
  {#if children}{@render children()}{:else}{fallback}{/if}
</button>
