<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  Desktop,
  Progress,
  RetroProvider,
  Row,
  Stack,
  TextInput,
  Window,
} from "@retro-ui/vue";

const clicks = ref(0);
</script>

<template>
  <RetroProvider theme="windows-95" class="fw-theme">
    <Desktop>
      <Window title="Vue — retro-ui" :width="300">
        <Stack>
          <TextInput default-value="Same components, Vue runtime" />
          <Row>
            <Button variant="primary" @click="clicks++">Click me</Button>
            <span>Clicked {{ clicks }}×</span>
          </Row>
          <Progress :value="40 + clicks * 6" label="demo" />
        </Stack>
      </Window>
    </Desktop>
  </RetroProvider>
</template>
