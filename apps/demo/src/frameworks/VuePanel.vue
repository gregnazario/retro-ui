<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  Desktop,
  Dialog,
  Menu,
  Progress,
  RetroProvider,
  Row,
  Stack,
  TextInput,
  Toggle,
  Tooltip,
  Window,
} from "@gregnazario/retro-ui-vue";

const clicks = ref(0);
const power = ref(false);
const aboutOpen = ref(false);
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
          <Row>
            <Toggle v-model:checked="power" label="Power" />
            <Menu
              label="Actions"
              :items="[
                { label: 'About…', onClick: () => (aboutOpen = true) },
                { label: 'Reset', onClick: () => (clicks = 0) },
              ]"
            />
            <Tooltip text="Adds one click">
              <Button @click="clicks++">+1</Button>
            </Tooltip>
          </Row>
          <Progress :value="40 + clicks * 6" label="demo" />
        </Stack>
      </Window>
    </Desktop>
    <Dialog :open="aboutOpen" title="About Vue" @close="aboutOpen = false">
      <p style="margin: 0 0 12px">Same components, Vue 3 runtime.</p>
      <Row>
        <Button variant="primary" @click="aboutOpen = false">OK</Button>
      </Row>
    </Dialog>
  </RetroProvider>
</template>
