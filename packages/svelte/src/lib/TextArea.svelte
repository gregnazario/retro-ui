<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";

  let {
    class: className = "",
    ...rest
  }: HTMLTextareaAttributes & { class?: string } = $props();
</script>

<textarea {...rest} class="retro-textarea{className ? ` ${className}` : ""}"></textarea>
