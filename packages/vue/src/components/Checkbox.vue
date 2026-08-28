<script setup lang="ts">
import { useAttrs } from "vue";

defineOptions({ inheritAttrs: false });
defineProps<{ label: string }>();
const attrs = useAttrs();
</script>

<template>
  <label class="retro-check">
    <input v-bind="attrs" type="checkbox" />
    <span>{{ label }}</span>
  </label>
</template>
