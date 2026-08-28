<script setup lang="ts">
import { ref, type VNode } from "vue";

const props = defineProps<{
  tabs: Array<{ id: string; label: string; content?: VNode }>;
  defaultTab?: string;
}>();

const active = ref(props.defaultTab ?? props.tabs[0]?.id);
</script>

<template>
  <div class="retro-tabs">
    <div class="retro-tablist" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        role="tab"
        class="retro-tab"
        :aria-selected="tab.id === active"
        @click="active = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>
    <template v-for="tab in tabs" :key="tab.id">
      <div v-if="tab.id === active" role="tabpanel" class="retro-tabpanel">
        <component :is="() => tab.content" />
      </div>
    </template>
  </div>
</template>
