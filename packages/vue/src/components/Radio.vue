<script setup lang="ts">
import { useAttrs } from "vue";

defineOptions({ inheritAttrs: false });
defineProps<{ label: string }>();
const attrs = useAttrs();
</script>

<template>
  <label class="retro-radio">
    <input v-bind="attrs" type="radio" />
    <span>{{ label }}</span>
  </label>
</template>
