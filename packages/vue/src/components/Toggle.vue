<script setup lang="ts">
defineProps<{
  label?: string;
  checked: boolean;
  disabled?: boolean;
}>();
const emit = defineEmits<{ "update:checked": [value: boolean] }>();
</script>

<template>
  <label class="retro-toggle">
    <button
      type="button"
      role="switch"
      class="retro-toggle-track"
      :aria-checked="checked"
      :aria-label="label"
      :disabled="disabled"
      @click="emit('update:checked', !checked)"
    >
      <span class="retro-toggle-thumb"></span>
    </button>
    <span v-if="label">{{ label }}</span>
  </label>
</template>
