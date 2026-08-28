<script setup lang="ts">
import { computed, inject, ref, type ComputedRef, type CSSProperties } from "vue";
import type { RetroTheme } from "@gregnazario/retro-ui-themes";
import { RETRO_THEME_KEY } from "../context";
import { bumpWindowStack } from "../windowStack";
import TitleButton from "./TitleButton.vue";

const props = withDefaults(
  defineProps<{
    title: string;
    active?: boolean;
    width?: number | string;
    draggable?: boolean;
  }>(),
  { active: true, draggable: true },
);

const theme = inject<ComputedRef<RetroTheme>>(RETRO_THEME_KEY);
const showControls = computed(() => theme?.value.controls !== "none");
const isMac = computed(() => theme?.value.controls === "mac");

const el = ref<HTMLElement | null>(null);
const offset = ref({ x: 0, y: 0 });
let dragInfo: {
  pointerId: number;
  startX: number;
  startY: number;
  baseX: number;
  baseY: number;
} | null = null;

function bringToFront() {
  if (el.value) el.value.style.zIndex = String(bumpWindowStack());
}

function onTitlePointerDown(event: PointerEvent) {
  if (!props.draggable || event.button !== 0) return;
  if ((event.target as HTMLElement).closest(".retro-titlebar-controls button")) return;
  bringToFront();
  dragInfo = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    baseX: offset.value.x,
    baseY: offset.value.y,
  };
  try {
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
  } catch {
    /* pointer capture unavailable — drag ends on release anyway */
  }
}

function onTitlePointerMove(event: PointerEvent) {
  if (!dragInfo || dragInfo.pointerId !== event.pointerId) return;
  offset.value = {
    x: dragInfo.baseX + event.clientX - dragInfo.startX,
    y: dragInfo.baseY + event.clientY - dragInfo.startY,
  };
}

function endDrag(event: PointerEvent) {
  if (dragInfo?.pointerId === event.pointerId) dragInfo = null;
}

const windowStyle = computed<CSSProperties>(() => ({
  ...(props.width != null ? { width: props.width } : {}),
  ...(props.draggable
    ? { transform: `translate(${offset.value.x}px, ${offset.value.y}px)` }
    : {}),
}));
</script>

<template>
  <section
    ref="el"
    class="retro-window"
    :data-active="active"
    :data-draggable="draggable"
    :style="windowStyle"
    @pointerdown="bringToFront"
  >
    <header
      class="retro-titlebar"
      @pointerdown="onTitlePointerDown"
      @pointermove="onTitlePointerMove"
      @pointerup="endDrag"
      @pointercancel="endDrag"
    >
      <div v-if="showControls && isMac" class="retro-titlebar-controls">
        <TitleButton kind="close" />
        <TitleButton kind="min" />
        <TitleButton kind="max" />
      </div>
      <div class="retro-titlebar-title">{{ title }}</div>
      <div v-if="showControls && !isMac" class="retro-titlebar-controls">
        <TitleButton kind="min" />
        <TitleButton kind="max" />
        <TitleButton kind="close" />
      </div>
    </header>
    <div class="retro-window-body">
      <slot />
    </div>
    <div v-if="$slots.status" class="retro-window-status">
      <slot name="status" />
    </div>
  </section>
</template>
