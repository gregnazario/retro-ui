import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Checkbox,
  Desktop,
  Dialog,
  Fieldset,
  Label,
  ListBox,
  Menu,
  MenuBar,
  Progress,
  Radio,
  Row,
  Select,
  Slider,
  Stack,
  StatusBar,
  Swatch,
  Table,
  Toggle,
  Tooltip,
  Tabs,
  TaskBar,
  TextArea,
  TextInput,
  Window,
} from "@gregnazario/retro-ui-react";
import type { RetroTheme } from "@gregnazario/retro-ui-themes";

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span>
      {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </span>
  );
}

export function KitchenSink({ theme }: { theme: RetroTheme }) {
  const [os, setOs] = useState("System");
  const [volume, setVolume] = useState(60);
  const [turbo, setTurbo] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const palette = useMemo(
    () => [
      theme.tokens.desktop,
      theme.tokens.surface,
      theme.tokens.accent,
      theme.tokens.titlebarBg,
      theme.tokens.fieldBg,
      theme.tokens.selectionBg,
    ],
    [theme],
  );

  const osLike =
    ["Desktop OS", "App", "Mobile"].includes(theme.era)
    || ["ps3-xmb", "xbox-blades", "wii-menu", "switch-home"].includes(theme.id);

  const startLabel = theme.engine === "luna" || theme.id === "longhorn"
    ? "start"
    : ["system7", "platinum", "aqua", "glass", "fluent"].includes(theme.engine)
      || [
        "unix-x11",
        "amigaos-4",
        "kde-plasma",
        "windows-3-1",
        "xerox-star",
        "atari-tos",
        "palm-os",
        "risc-os",
        "open-look",
        "android-holo",
        "blackberry-os",
        "palm-webos",
        "newton-os",
        "magic-cap",
        "ps3-xmb",
        "xbox-blades",
        "switch-home",
        "haiku-os",
        "elementary-os",
        "ubuntu-unity",
        "geos",
        "plan-9",
        "meego-n9",
      ].includes(theme.id)
      ? null
      : theme.id === "classic-gnome" || theme.id === "xfce-4"
        ? "Applications"
        : theme.id === "gnome-40"
          ? "Activities"
        : theme.id === "kde-3"
          ? "K"
          : theme.id === "symbian-s60"
            ? "Options"
            : theme.id === "wii-menu"
              ? "Wii"
              : "Start";
  return (
    <Desktop
      taskbar={
        osLike ? (
          <TaskBar startLabel={startLabel} clock={<Clock />}>
            <button type="button" className="retro-button retro-task">
              {theme.name}
            </button>
          </TaskBar>
        ) : undefined
      }
    >
      <Window
        title={`${theme.name} — Control Panel`}
        width={520}
        status={
          <StatusBar
            items={[
              `${theme.year}`,
              theme.engine,
              `${theme.tokens.fontSize} UI`,
            ]}
          />
        }
      >
        <MenuBar
          items={[
            { label: "File" },
            { label: "Edit" },
            { label: "View" },
            { label: "Help" },
          ]}
        />
        <Stack>
          <p style={{ margin: "8px 0" }}>{theme.description}</p>
          <Tabs
            tabs={[
              {
                id: "general",
                label: "General",
                content: (
                  <Stack>
                    <Fieldset legend="Identity">
                      <Label>
                        Display name
                        <TextInput defaultValue={theme.name} />
                      </Label>
                      <Label>
                        Era
                        <Select defaultValue={theme.era}>
                          <option>{theme.era}</option>
                          <option>Desktop OS</option>
                          <option>Terminal</option>
                          <option>Web/UI</option>
                        </Select>
                      </Label>
                    </Fieldset>
                    <Fieldset legend="Options">
                      <Stack>
                        <Checkbox label="Enable sounds" defaultChecked />
                        <Checkbox label="Show hidden files" />
                        <Radio name="boot" label="Normal startup" defaultChecked />
                        <Radio name="boot" label="Safe mode" />
                      <Toggle label="Turbo mode" checked={turbo} onChange={setTurbo} />
                      </Stack>
                    </Fieldset>
                  </Stack>
                ),
              },
              {
                id: "colors",
                label: "Colors",
                content: (
                  <Stack>
                    <Row>
                      {palette.map((color) => (
                        <Swatch key={color} color={color} />
                      ))}
                    </Row>
                    <Label>
                      Volume
                      <Slider
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(event) => setVolume(Number(event.target.value))}
                      />
                    </Label>
                    <Progress value={volume} label="Copy progress" />
                  </Stack>
                ),
              },
              {
                id: "devices",
                label: "Devices",
                content: (
                  <Stack>
                    <ListBox
                      items={["Display", "Keyboard", "Mouse", "Printer", "Network"]}
                      value={os}
                      onChange={setOs}
                    />
                    <Table
                      columns={["Name", "Year", "Engine"]}
                      rows={[
                        [theme.name, String(theme.year), theme.engine],
                        [theme.era, theme.slug, theme.controls],
                      ]}
                    />
                  </Stack>
                ),
              },
            ]}
          />
          <Label>
            Notes
            <TextArea defaultValue={`Ready.\n${theme.tags.join(" · ")}`} />
          </Label>
          <Row>
            <Button variant="primary">OK</Button>
            <Button>Cancel</Button>
            <Button>Apply</Button>
            <Button disabled>Disabled</Button>
            <Menu
              label="Actions"
              items={[
                { label: "About…", onClick: () => setAboutOpen(true) },
                { label: "Refresh" },
                { label: "Export…", disabled: true },
              ]}
            />
            <Tooltip text="Opens the about dialog">
              <Button onClick={() => setAboutOpen(true)}>About…</Button>
            </Tooltip>
            <Badge>{theme.year}</Badge>
          </Row>
        </Stack>
      </Window>
      <Window title="About" width={280} active={false}>
        <Alert title={theme.name}>
          <p style={{ margin: "8px 0 0" }}>
            {theme.year} · {theme.era}
          </p>
        </Alert>
        <div style={{ height: 12 }} />
        <Row>
          <Button variant="primary">OK</Button>
        </Row>
      </Window>
      <Dialog
        open={aboutOpen}
        title={`About ${theme.name}`}
        onClose={() => setAboutOpen(false)}
      >
        <p style={{ margin: "0 0 12px" }}>{theme.description}</p>
        <Row>
          <Button variant="primary" onClick={() => setAboutOpen(false)}>
            OK
          </Button>
        </Row>
      </Dialog>
    </Desktop>
  );
}
