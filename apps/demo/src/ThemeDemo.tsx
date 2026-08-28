import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Checkbox,
  Desktop,
  Fieldset,
  Label,
  ListBox,
  MenuBar,
  Progress,
  Radio,
  RetroProvider,
  Row,
  Select,
  Separator,
  Slider,
  Stack,
  StatusBar,
  Swatch,
  Table,
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

export function ThemeDemo({ theme }: { theme: RetroTheme }) {
  const [volume, setVolume] = useState(60);
  const [device, setDevice] = useState("Display");

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

  const osLike = ["Desktop OS", "App"].includes(theme.era);

  const startLabel = theme.engine === "luna"
    ? "start"
    : ["system7", "platinum", "aqua"].includes(theme.engine) || theme.id === "unix-x11"
      ? null
      : theme.id === "classic-gnome" || theme.id === "xfce-4"
        ? "Applications"
        : theme.id === "kde-3"
          ? "K"
          : "Start";
  return (
    <RetroProvider theme={theme} className="demo-theme">
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
          width={540}
          status={
            <StatusBar
              items={[
                String(theme.year),
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
                          onChange={(event) =>
                            setVolume(Number(event.target.value))
                          }
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
                        value={device}
                        onChange={setDevice}
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
              <Badge>{theme.year}</Badge>
            </Row>
          </Stack>
        </Window>

        <Window title="About" width={300} active={false}>
          <Alert title={theme.name}>
            <p style={{ margin: "8px 0 0" }}>
              {theme.year} · {theme.era}
            </p>
          </Alert>
          <Separator />
          <Row>
            <Button variant="primary">OK</Button>
          </Row>
        </Window>
      </Desktop>
    </RetroProvider>
  );
}
