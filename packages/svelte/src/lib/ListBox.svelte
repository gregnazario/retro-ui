<script lang="ts">
  let {
    items,
    value,
    onChange,
  }: { items: string[]; value?: string; onChange?: (value: string) => void } = $props();
</script>

<ul class="retro-listbox" role="listbox">
  {#each items as item (item)}
    <li
      role="option"
      tabindex="0"
      aria-selected={item === value}
      data-selected={item === value}
      onclick={() => onChange?.(item)}
      onkeydown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onChange?.(item);
        }
      }}
    >
      {item}
    </li>
  {/each}
</ul>
