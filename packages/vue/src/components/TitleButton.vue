<script setup lang="ts">
const props = defineProps<{ kind: "min" | "max" | "close" }>();
const fallbacks: Record<string, string> = { min: "–", max: "□", close: "×" };
</script>

<template>
  <button
    type="button"
    class="retro-button retro-ctrl"
    :class="props.kind"
    :aria-label="props.kind === 'min' ? 'Minimize' : props.kind === 'max' ? 'Maximize' : 'Close'"
  >
    <slot>{{ fallbacks[props.kind] }}</slot>
  </button>
</template>
