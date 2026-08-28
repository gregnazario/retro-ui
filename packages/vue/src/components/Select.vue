<script setup lang="ts">
import { useAttrs } from "vue";

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
</script>

<template>
  <select v-bind="attrs" class="retro-select">
    <slot />
  </select>
</template>
