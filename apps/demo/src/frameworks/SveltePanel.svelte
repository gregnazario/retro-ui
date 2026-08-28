<script lang="ts">
  import {
    Button,
    Desktop,
    Progress,
    RetroProvider,
    Row,
    Stack,
    TextInput,
    Window,
  } from "@retro-ui/svelte";

  let clicks = $state(0);
</script>

<RetroProvider theme="windows-95" class="fw-theme">
  <Desktop>
    <Window title="Svelte — retro-ui" width={300}>
      <Stack>
        <TextInput defaultValue="Same components, Svelte runtime" />
        <Row>
          <Button variant="primary" onclick={() => (clicks += 1)}>Click me</Button>
          <span>Clicked {clicks}×</span>
        </Row>
        <Progress value={40 + clicks * 6} label="demo" />
      </Stack>
    </Window>
  </Desktop>
</RetroProvider>
