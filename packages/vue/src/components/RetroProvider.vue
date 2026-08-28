<script setup lang="ts">
import { computed, provide, type ComputedRef } from "vue";
import { getTheme, themeToCssVars, type RetroTheme } from "@gregnazario/retro-ui-themes";
import { RETRO_THEME_KEY } from "../context";

const props = defineProps<{ theme: RetroTheme | string }>();

const resolved = computed<RetroTheme>(() =>
  typeof props.theme === "string" ? getTheme(props.theme) : props.theme,
);

provide<ComputedRef<RetroTheme>>(RETRO_THEME_KEY, resolved);

const cssVars = computed<Record<string, string>>(() => themeToCssVars(resolved.value));
</script>

<template>
  <div
    class="retro-root"
    :data-theme="resolved.id"
    :data-engine="resolved.engine"
    :data-controls="resolved.controls"
    :style="cssVars"
  >
    <slot />
  </div>
</template>
