<script setup lang="ts">
defineProps<{ items: Array<{ label: string; onClick?: () => void }> }>();
</script>

<template>
  <nav class="retro-menubar" aria-label="Menu bar">
    <button
      v-for="item in items"
      :key="item.label"
      type="button"
      class="retro-menuitem"
      @click="item.onClick"
    >
      {{ item.label }}
    </button>
  </nav>
</template>
