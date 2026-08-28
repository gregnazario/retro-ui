<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  let { children, ...rest }: HTMLAttributes<HTMLElement> & { children?: Snippet } = $props();
</script>

<div {...rest}>{@render children?.()}</div>
