<script lang="ts">
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
  } from "@gregnazario/retro-ui-svelte";

  let clicks = $state(0);
  let power = $state(false);
  let aboutOpen = $state(false);
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
        <Row>
          <Toggle label="Power" checked={power} onChange={(next) => (power = next)} />
          <Menu
            label="Actions"
            items={[{ label: "About…", onClick: () => (aboutOpen = true) }, { label: "Reset", onClick: () => (clicks = 0) }]}
          />
          <Tooltip text="Adds one click">
            <Button onclick={() => (clicks += 1)}>+1</Button>
          </Tooltip>
        </Row>
        <Progress value={40 + clicks * 6} label="demo" />
      </Stack>
    </Window>
  </Desktop>
  <Dialog open={aboutOpen} title="About Svelte" onClose={() => (aboutOpen = false)}>
    <p style="margin: 0 0 12px">Same components, compiled by Svelte 5.</p>
    <Row>
      <Button variant="primary" onclick={() => (aboutOpen = false)}>OK</Button>
    </Row>
  </Dialog>
</RetroProvider>
