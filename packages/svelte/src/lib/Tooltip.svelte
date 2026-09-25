<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    text,
    children,
  }: {
    text: string;
    children?: Snippet;
  } = $props();
</script>

<span class="retro-tooltip" data-text={text}>{@render children?.()}</span>
