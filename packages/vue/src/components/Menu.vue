<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";

defineProps<{
  label: string;
  items: Array<{ label: string; onClick?: () => void; disabled?: boolean }>;
}>();

const open = ref(false);
const root = ref<HTMLElement | null>(null);

function onDocPointerDown(event: PointerEvent) {
  if (!root.value?.contains(event.target as Node)) open.value = false;
}
function onKey(event: KeyboardEvent) {
  if (event.key === "Escape") open.value = false;
}

watch(open, (value) => {
  if (value) {
    document.addEventListener("pointerdown", onDocPointerDown);
    document.addEventListener("keydown", onKey);
  } else {
    document.removeEventListener("pointerdown", onDocPointerDown);
    document.removeEventListener("keydown", onKey);
  }
});
onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onDocPointerDown);
  document.removeEventListener("keydown", onKey);
});
</script>

<template>
  <div ref="root" class="retro-menu">
    <button
      type="button"
      class="retro-button"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="open = !open"
    >
      {{ label }}
    </button>
    <div v-if="open" class="retro-menu-popup" role="menu">
      <button
        v-for="item in items"
        :key="item.label"
        type="button"
        role="menuitem"
        :disabled="item.disabled"
        @click="
          open = false;
          item.onClick?.();
        "
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>
