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
      aria-selected={item === value}
      data-selected={item === value}
      onclick={() => onChange?.(item)}
    >
      {item}
    </li>
  {/each}
</ul>
