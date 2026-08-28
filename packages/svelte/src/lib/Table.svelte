<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    columns,
    rows,
  }: { columns: string[]; rows: Array<Array<string | Snippet>> } = $props();
</script>

<div class="retro-table-wrap">
  <table class="retro-table">
    <thead>
      <tr>
        {#each columns as column (column)}<th>{column}</th>{/each}
      </tr>
    </thead>
    <tbody>
      {#each rows as row, index (index)}
        <tr data-selected={index === 0}>
          {#each row as cell, cellIndex (cellIndex)}
            <td>
              {#if typeof cell === "string"}{cell}{:else}{@render cell()}{/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
