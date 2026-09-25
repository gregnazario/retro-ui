<script lang="ts">
  import {
    RetroProvider,
    Tabs,
    TextInput,
    Button,
    Toggle,
    Window,
  } from "@gregnazario/retro-ui-svelte";

  let power = $state(true);

  let { themeId, title = "Panel" }: { themeId: string; title?: string } = $props();
</script>

{#snippet alpha()}<p>alpha panel</p>{/snippet}
{#snippet beta()}<p>beta panel</p>{/snippet}

<RetroProvider theme={themeId}>
  <Window {title}>
    <TextInput defaultValue="retro" />
    <Tabs
      tabs={[
        { id: "a", label: "Alpha", content: alpha },
        { id: "b", label: "Beta", content: beta },
      ]}
    />
    <Toggle label="Power" checked={power} onChange={(next) => (power = next)} />
    <Button variant="primary">OK</Button>
  </Window>
</RetroProvider>
