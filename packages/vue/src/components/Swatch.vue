<script setup lang="ts">
const props = defineProps<{ color: string; title?: string }>();
const label = () => props.title ?? props.color;
</script>

<template>
  <span class="retro-swatch" :title="label()" :style="{ background: color }"></span>
</template>
