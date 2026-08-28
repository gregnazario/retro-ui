<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";

  let {
    variant = "default",
    class: className = "",
    children,
    ...rest
  }: HTMLButtonAttributes & {
    variant?: "default" | "primary";
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<button
  type="button"
  {...rest}
  class="retro-button{variant === "primary" ? " retro-button-primary" : ""}{className ? ` ${className}` : ""}"
>
  {@render children?.()}
</button>
