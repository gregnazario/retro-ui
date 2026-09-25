<script setup lang="ts">
import { onBeforeUnmount, watch } from "vue";
import Window from "./Window.vue";

const props = defineProps<{
  open: boolean;
  title: string;
  width?: number | string;
  closeOnBackdrop?: boolean;
}>();
const emit = defineEmits<{ close: [] }>();

function onKey(event: KeyboardEvent) {
  if (event.key === "Escape") emit("close");
}

watch(
  () => props.open,
  (open) => {
    if (open) document.addEventListener("keydown", onKey);
    else document.removeEventListener("keydown", onKey);
  },
  { immediate: true },
);
onBeforeUnmount(() => document.removeEventListener("keydown", onKey));
</script>

<template>
  <div
    v-if="open"
    class="retro-dialog-backdrop"
    @pointerdown="(event) => {
      if ((closeOnBackdrop ?? true) && event.target === event.currentTarget) emit('close');
    }"
  >
    <div role="dialog" aria-modal="true" :aria-label="title" class="retro-dialog-wrap">
      <Window :title="title" :width="width" class="retro-dialog" :draggable="false">
        <slot />
      </Window>
    </div>
  </div>
</template>
