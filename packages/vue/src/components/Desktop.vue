<script setup lang="ts">
import { computed, inject, type ComputedRef } from "vue";
import type { RetroTheme } from "@gregnazario/retro-ui-themes";
import { RETRO_THEME_KEY } from "../context";

const theme = inject<ComputedRef<RetroTheme>>(RETRO_THEME_KEY);
const pattern = computed(() => theme?.value.desktopPattern);
const panel = computed(() => theme?.value.taskbarPosition ?? "bottom");
</script>

<template>
  <div
    class="retro-desktop"
    :data-pattern="pattern"
    :data-panel="$slots.taskbar ? panel : 'none'"
  >
    <div class="retro-desktop-stage">
      <slot />
    </div>
    <slot name="taskbar" />
  </div>
</template>
