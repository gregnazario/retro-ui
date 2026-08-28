<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ value: number; label?: string }>();
const clamped = computed(() => Math.max(0, Math.min(100, props.value)));
</script>

<template>
  <div
    class="retro-progress"
    role="progressbar"
    :aria-valuenow="clamped"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="label"
  >
    <div class="retro-progress-bar" :style="{ width: `${clamped}%` }"></div>
  </div>
</template>
