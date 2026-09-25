<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <span class="retro-tooltip" :data-text="text"><slot /></span>
</template>
