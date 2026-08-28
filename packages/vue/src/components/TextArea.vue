<script setup lang="ts">
import { useAttrs } from "vue";

defineOptions({ inheritAttrs: false });
const attrs = useAttrs();
</script>

<template>
  <textarea v-bind="attrs" class="retro-textarea"></textarea>
</template>
