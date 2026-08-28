<script setup lang="ts">
defineProps<{ items: string[] }>();
</script>

<template>
  <div class="retro-statusbar">
    <div v-for="(item, index) in items" :key="index">{{ item }}</div>
  </div>
</template>
