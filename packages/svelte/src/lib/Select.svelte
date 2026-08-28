<script lang="ts">
  import type { HTMLSelectAttributes } from "svelte/elements";

  let {
    class: className = "",
    children,
    ...rest
  }: HTMLSelectAttributes & { class?: string } = $props();
</script>

<select {...rest} class="retro-select{className ? ` ${className}` : ""}">
  {@render children?.()}
</select>
