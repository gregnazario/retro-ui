<script lang="ts">
  import type { Snippet } from "svelte";

  let { legend, children }: { legend: string; children?: Snippet } = $props();
</script>

<fieldset class="retro-fieldset">
  <legend>{legend}</legend>
  {@render children?.()}
</fieldset>
