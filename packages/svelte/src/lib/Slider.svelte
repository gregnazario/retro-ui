<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  let { ...rest }: HTMLInputAttributes = $props();
</script>

<input type="range" class="retro-slider" {...rest} />
