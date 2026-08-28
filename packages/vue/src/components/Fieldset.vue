<script setup lang="ts">
defineProps<{ legend: string }>();
</script>

<template>
  <fieldset class="retro-fieldset">
    <legend>{{ legend }}</legend>
    <slot />
  </fieldset>
</template>
