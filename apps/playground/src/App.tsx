import { useEffect, useMemo, useState } from "react";
import { RetroProvider } from "@retro-ui/react";
import { EXPECTED_STYLE_IDS, getTheme, themes, type RetroTheme } from "@retro-ui/themes";
import { KitchenSink } from "./KitchenSink";

function themeFromHash(): RetroTheme {
  const id = window.location.hash.replace(/^#/, "");
  if (id) {
    try {
      return getTheme(id);
    } catch {
      /* fall through */
    }
  }
  return getTheme("windows-95");
}

export function App() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<RetroTheme>(() =>
    typeof window === "undefined" ? getTheme("windows-95") : themeFromHash(),
  );

  useEffect(() => {
    const onHash = () => setTheme(themeFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function selectTheme(next: RetroTheme) {
    setTheme(next);
    window.location.hash = next.id;
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return themes;
    return themes.filter((item) =>
      `${item.name} ${item.era} ${item.tags.join(" ")} ${item.year}`.toLowerCase().includes(q),
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, RetroTheme[]>();
    for (const item of filtered) {
      const list = map.get(item.era) ?? [];
      list.push(item);
      map.set(item.era, list);
    }
    return [...map.entries()];
  }, [filtered]);

  const snippet = `import { RetroProvider, Window, Button } from '@retro-ui/react'
import { getTheme } from '@retro-ui/themes'

<RetroProvider theme={getTheme('${theme.id}')}>
  <Window title="${theme.name}">
    <Button variant="primary">OK</Button>
  </Window>
</RetroProvider>`;

  return (
    <div className="gallery">
      <aside className="gallery-nav">
        <div className="gallery-brand">
          <strong>retro-ui</strong>
          <span>
            {EXPECTED_STYLE_IDS.length} design systems
          </span>
        </div>
        <input
          className="gallery-search"
          placeholder="Search styles"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="gallery-list">
          {grouped.map(([era, items]) => (
            <section key={era}>
              <h2>{era}</h2>
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={item.id === theme.id ? "is-active" : undefined}
                  onClick={() => selectTheme(item)}
                >
                  <span>{item.name}</span>
                  <em>{item.year}</em>
                </button>
              ))}
            </section>
          ))}
        </div>
      </aside>
      <main className="gallery-main">
        <header className="gallery-head">
          <div>
            <p className="eyebrow">
              {theme.era} · {theme.engine}
            </p>
            <h1>{theme.name}</h1>
            <p>{theme.description}</p>
          </div>
          <ul className="tags">
            {theme.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </header>
        <div className="gallery-preview">
          <RetroProvider theme={theme} className="gallery-theme">
            <KitchenSink theme={theme} />
          </RetroProvider>
        </div>
        <section className="gallery-meta">
          <div>
            <h3>Usage</h3>
            <pre>
              <code>{snippet}</code>
            </pre>
          </div>
          <div>
            <h3>Tokens</h3>
            <dl className="token-list">
              {Object.entries(theme.tokens)
                .filter(([, value]) => value.startsWith("#") || value.startsWith("rgb") || value.startsWith("linear") || value.startsWith("rgba"))
                .slice(0, 12)
                .map(([key, value]) => (
                  <div key={key}>
                    <dt>{key}</dt>
                    <dd>
                      <i style={{ background: value }} />
                      {value}
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        </section>
      </main>
    </div>
  );
}
