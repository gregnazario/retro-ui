<script lang="ts">
  import type { HTMLLabelAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  let {
    class: className = "",
    children,
    ...rest
  }: HTMLLabelAttributes & { class?: string; children?: Snippet } = $props();
</script>

<label {...rest} class="retro-label{className ? ` ${className}` : ""}">
  {@render children?.()}
</label>
