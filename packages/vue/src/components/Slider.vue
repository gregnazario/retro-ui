<script setup lang="ts">
import { useAttrs } from "vue";

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
</script>

<template>
  <input v-bind="attrs" type="range" class="retro-slider" />
</template>
