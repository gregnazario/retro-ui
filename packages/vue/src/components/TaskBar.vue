<script setup lang="ts">
import { computed, inject, type ComputedRef } from "vue";
import type { RetroTheme } from "@gregnazario/retro-ui-themes";
import { RETRO_THEME_KEY } from "../context";

withDefaults(
  defineProps<{
    startLabel?: string | null;
    position?: "top" | "bottom";
  }>(),
  { startLabel: "Start" },
);

const theme = inject<ComputedRef<RetroTheme>>(RETRO_THEME_KEY);
const resolvedPosition = computed(
  () => theme?.value.taskbarPosition ?? "bottom",
);
</script>

<template>
  <footer class="retro-taskbar" :data-position="resolvedPosition">
    <button
      v-if="startLabel != null"
      type="button"
      class="retro-button retro-start"
    >
      {{ startLabel }}
    </button>
    <slot />
    <div v-if="$slots.clock" class="retro-clock">
      <slot name="clock" />
    </div>
  </footer>
</template>
