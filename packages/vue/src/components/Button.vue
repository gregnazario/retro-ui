<script setup lang="ts">
const props = defineProps<{ variant?: "default" | "primary" }>();
</script>

<template>
  <button
    type="button"
    class="retro-button"
    :class="{ 'retro-button-primary': props.variant === 'primary' }"
  >
    <slot />
  </button>
</template>
