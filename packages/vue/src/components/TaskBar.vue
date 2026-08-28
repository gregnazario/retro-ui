<script setup lang="ts">
withDefaults(defineProps<{ startLabel?: string }>(), { startLabel: "Start" });
</script>

<template>
  <footer class="retro-taskbar">
    <button type="button" class="retro-button retro-start">{{ startLabel }}</button>
    <slot />
    <div v-if="$slots.clock" class="retro-clock"><slot name="clock" /></div>
  </footer>
</template>
