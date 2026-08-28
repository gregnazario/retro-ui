<script setup lang="ts">
defineProps<{
  items: string[];
  value?: string;
  onChange?: (value: string) => void;
}>();

const emit = defineEmits<{ change: [value: string] }>();

function select(item: string) {
  emit("change", item);
}

function onKeydown(event: KeyboardEvent, item: string) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    select(item);
  }
}
</script>

<template>
  <ul class="retro-listbox" role="listbox">
    <li
      v-for="item in items"
      :key="item"
      role="option"
      tabindex="0"
      :aria-selected="item === value"
      :data-selected="item === value"
      @click="select(item); onChange?.(item)"
      @keydown="onKeydown($event, item)"
    >
      {{ item }}
    </li>
  </ul>
</template>
