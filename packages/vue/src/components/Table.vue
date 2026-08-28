<script setup lang="ts">
import type { VNode } from "vue";

defineProps<{
  columns: string[];
  rows: Array<Array<string | VNode>>;
}>();
</script>

<template>
  <div class="retro-table-wrap">
    <table class="retro-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index" :data-selected="index === 0">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">
            <component :is="() => cell" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
