import { useState } from "react";
import {
  Button,
  Desktop,
  Progress,
  RetroProvider,
  Row,
  Stack,
  TextInput,
  Window,
} from "@gregnazario/retro-ui-react";
import SveltePanel from "./frameworks/SveltePanel.svelte";
import { SvelteHost } from "./frameworks/SvelteHost";
import VuePanel from "./frameworks/VuePanel.vue";
import { VueHost } from "./frameworks/VueHost";

function ReactPanel() {
  const [clicks, setClicks] = useState(0);
  return (
    <RetroProvider theme="windows-95" className="fw-theme">
      <Desktop>
        <Window title="React — retro-ui" width={300}>
          <Stack>
            <TextInput defaultValue="Same components, React runtime" />
            <Row>
              <Button variant="primary" onClick={() => setClicks((n) => n + 1)}>
                Click me
              </Button>
              <span>Clicked {clicks}×</span>
            </Row>
            <Progress value={40 + clicks * 6} label="demo" />
          </Stack>
        </Window>
      </Desktop>
    </RetroProvider>
  );
}

export function Frameworks() {
  return (
    <main className="detail-page">
      <div className="detail-topbar">
        <a href="#/" className="back-link">
          ← All styles
        </a>
        <span className="detail-index">React · Vue · Svelte</span>
      </div>

      <header className="detail-head">
        <div>
          <p className="eyebrow">One component API</p>
          <h1>Three frameworks, live.</h1>
          <p className="detail-lede">
            The same retro-ui components rendered by React, Vue, and Svelte —
            side by side in one page. Every window below is draggable by its
            title bar, and every button is live.
          </p>
        </div>
      </header>

      <div className="fw-grid">
        <section className="fw-panel">
          <header>
            <h2>React</h2>
            <code>@gregnazario/retro-ui-react</code>
          </header>
          <div className="fw-stage">
            <ReactPanel />
          </div>
        </section>
        <section className="fw-panel">
          <header>
            <h2>Vue</h2>
            <code>@gregnazario/retro-ui-vue</code>
          </header>
          <div className="fw-stage">
            <VueHost component={VuePanel} />
          </div>
        </section>
        <section className="fw-panel">
          <header>
            <h2>Svelte</h2>
            <code>@gregnazario/retro-ui-svelte</code>
          </header>
          <div className="fw-stage">
            <SvelteHost component={SveltePanel} />
          </div>
        </section>
      </div>

      <section className="detail-meta">
        <div>
          <h3>Install — React</h3>
          <pre>
            <code>npm install @gregnazario/retro-ui-react @gregnazario/retro-ui-themes</code>
          </pre>
        </div>
        <div>
          <h3>Install — Vue</h3>
          <pre>
            <code>npm install @gregnazario/retro-ui-vue @gregnazario/retro-ui-themes</code>
          </pre>
        </div>
      </section>
      <section className="detail-meta">
        <div>
          <h3>Install — Svelte</h3>
          <pre>
            <code>npm install @gregnazario/retro-ui-svelte @gregnazario/retro-ui-themes</code>
          </pre>
        </div>
        <div>
          <h3>Shared core</h3>
          <pre>
            <code>{`All three adapters render the same class names,
styled by @gregnazario/retro-ui-styles and themed by
@gregnazario/retro-ui-themes. Switching frameworks
never changes your design tokens.`}</code>
          </pre>
        </div>
      </section>
    </main>
  );
}
