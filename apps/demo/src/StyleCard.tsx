import {
  Button,
  Checkbox,
  Desktop,
  Progress,
  RetroProvider,
  Row,
  Stack,
  TextInput,
  Window,
} from "@retro-ui/react";
import type { RetroTheme } from "@retro-ui/themes";

export function StyleCard({ theme }: { theme: RetroTheme }) {
  return (
    <article className="card">
      <div className="card-stage" aria-hidden="true">
        <RetroProvider theme={theme} className="card-theme">
          <Desktop>
            <Window title={theme.name} width={264}>
              <Stack>
                <TextInput defaultValue={theme.slug} />
                <Checkbox label="Enable effects" defaultChecked />
                <Progress value={64} label="Loading style" />
                <Row>
                  <Button variant="primary">OK</Button>
                  <Button>Cancel</Button>
                </Row>
              </Stack>
            </Window>
          </Desktop>
        </RetroProvider>
      </div>
      <div className="card-caption">
        <strong>{theme.name}</strong>
        <span>
          {theme.year} · {theme.engine}
        </span>
      </div>
      <a className="card-hit" href={`#/style/${theme.id}`}>
        Open the {theme.name} style
      </a>
    </article>
  );
}
