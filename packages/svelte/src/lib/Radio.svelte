<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  let {
    label,
    class: className = "",
    ...rest
  }: HTMLInputAttributes & { label: string; class?: string } = $props();
</script>

<label class="retro-radio{className ? ` ${className}` : ""}">
  <input type="radio" {...rest} />
  <span>{label}</span>
</label>
