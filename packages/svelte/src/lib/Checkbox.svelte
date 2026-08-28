<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  let {
    label,
    class: className = "",
    ...rest
  }: HTMLInputAttributes & { label: string; class?: string } = $props();
</script>

<label class="retro-check{className ? ` ${className}` : ""}">
  <input type="checkbox" {...rest} />
  <span>{label}</span>
</label>
