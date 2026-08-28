<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="retro-alert" role="status">
    <strong>{{ title }}</strong>
    <div v-if="$slots.default"><slot /></div>
  </div>
</template>
