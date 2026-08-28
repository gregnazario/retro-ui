import { useEffect, useMemo, useState } from "react";
import { getTheme, themes, type RetroTheme } from "@retro-ui/themes";
import { ThemeDemo } from "./ThemeDemo";

const isColor = (value: string) =>
/^(#|rgb|hsl|linear|radial|conic|color|rgba|hsla)/.test(value);

type Framework = "react" | "vue" | "svelte";

const FRAMEWORKS: Array<{ id: Framework; label: string; pkg: string }> = [
  { id: "react", label: "React", pkg: "@retro-ui/react" },
  { id: "vue", label: "Vue", pkg: "@retro-ui/vue" },
  { id: "svelte", label: "Svelte", pkg: "@retro-ui/svelte" },
];

function snippetFor(theme: RetroTheme, framework: Framework): string {
  if (framework === "vue") {
    return `<script setup>
import { RetroProvider, Window, Button } from "@retro-ui/vue";
import { getTheme } from "@retro-ui/themes";
</script>

<template>
  <RetroProvider :theme="getTheme('${theme.id}')">
    <Window title="Welcome">
      <p>Hello from ${theme.year}.</p>
      <Button variant="primary">OK</Button>
    </Window>
  </RetroProvider>
</template>`;
  }
  if (framework === "svelte") {
    return `<script>
  import { RetroProvider, Window, Button } from "@retro-ui/svelte";
  import { getTheme } from "@retro-ui/themes";
</script>

<RetroProvider theme={getTheme("${theme.id}")}>
  <Window title="Welcome">
    <p>Hello from ${theme.year}.</p>
    <Button variant="primary">OK</Button>
  </Window>
</RetroProvider>`;
  }
  return `import { RetroProvider, Window, Button } from "@retro-ui/react";
import { getTheme } from "@retro-ui/themes";

export function App() {
  return (
    <RetroProvider theme={getTheme("${theme.id}")}>
      <Window title="Welcome">
        <p>Hello from ${theme.year}.</p>
        <Button variant="primary">OK</Button>
      </Window>
    </RetroProvider>
  );
}`;
}

export function Detail({ id }: { id: string }) {
  const theme = useMemo<RetroTheme | null>(() => {
    try {
      return getTheme(id);
    } catch {
      return null;
    }
  }, [id]);

  const [copied, setCopied] = useState(false);
  const [framework, setFramework] = useState<Framework>("react");

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setCopied(false);
    setFramework("react");
  }, [id]);

  if (!theme) {
    return (
      <main className="detail-page">
        <div className="missing">
          <h1>Unknown style</h1>
          <p>
            No theme matches “{id}”.{" "}
            <a href="#/">Back to the gallery</a>.
          </p>
        </div>
      </main>
    );
  }

  const index = themes.findIndex((item) => item.id === theme.id);
  const prev = themes[(index - 1 + themes.length) % themes.length] ?? theme;
  const next = themes[(index + 1) % themes.length] ?? theme;
  const snippet = snippetFor(theme, framework);
  const colorTokens = Object.entries(theme.tokens).filter(([, value]) =>
    isColor(value),
  );

  async function copySnippet() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — the snippet is still selectable below */
    }
  }

  return (
    <main className="detail-page">
      <div className="detail-topbar">
        <a href="#/" className="back-link">
          ← All styles
        </a>
        <span className="detail-index">
          {index + 1} / {themes.length}
        </span>
      </div>

      <header className="detail-head">
        <div>
          <p className="eyebrow">
            {theme.era} · {theme.engine} engine · {theme.year}
          </p>
          <h1>{theme.name}</h1>
          <p className="detail-lede">{theme.description}</p>
        </div>
        <ul className="tags">
          {theme.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </header>

      <p className="stage-hint">
        Tip: these are live components — drag the windows by their title bars,
        flip the tabs, move the slider.
      </p>
      <div className="demo-stage">
        <ThemeDemo theme={theme} />
      </div>

      <section className="detail-meta">
        <div>
          <h3>Usage</h3>
          <div className="snippet-bar">
            <div className="snippet-tabs" role="tablist" aria-label="Framework">
              {FRAMEWORKS.map((fw) => (
                <button
                  key={fw.id}
                  type="button"
                  role="tab"
                  aria-selected={framework === fw.id}
                  className={framework === fw.id ? "is-active" : undefined}
                  onClick={() => setFramework(fw.id)}
                >
                  {fw.label}
                </button>
              ))}
            </div>
            <button type="button" onClick={copySnippet}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre>
            <code>{snippet}</code>
          </pre>
        </div>
        <div>
          <h3>Color tokens</h3>
          <ul className="token-grid">
            {colorTokens.map(([key, value]) => (
              <li key={key} title={`${key}: ${value}`}>
                <i style={{ background: value }} />
                <span>{key}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <nav className="style-pager">
        <a href={`#/style/${prev.id}`}>
          <span>Previous</span>
          <strong>← {prev.name}</strong>
        </a>
        <a href={`#/style/${next.id}`}>
          <span>Next</span>
          <strong>{next.name} →</strong>
        </a>
      </nav>
    </main>
  );
}
