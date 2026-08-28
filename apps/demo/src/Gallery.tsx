import { useMemo, useState } from "react";
import { themes, type RetroTheme } from "@retro-ui/themes";
import { StyleCard } from "./StyleCard";

function groupByEra(items: RetroTheme[]): Array<[string, RetroTheme[]]> {
  const map = new Map<string, RetroTheme[]>();
  for (const item of items) {
    const list = map.get(item.era) ?? [];
    list.push(item);
    map.set(item.era, list);
  }
  return [...map.entries()];
}

export function Gallery() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return themes;
    return themes.filter((item) =>
      `${item.name} ${item.era} ${item.engine} ${item.tags.join(" ")} ${item.year}`
        .toLowerCase()
        .includes(q),
    );
  }, [query]);

  const grouped = useMemo(() => groupByEra(filtered), [filtered]);
  const engineCount = useMemo(
    () => new Set(themes.map((theme) => theme.engine)).size,
    [],
  );

  return (
    <main className="gallery-page">
      <section className="hero">
        <p className="eyebrow">The retro-ui demo</p>
        <h1>Every style, live.</h1>
        <p className="hero-lede">
          {themes.length} complete design systems behind a single React
          component API. Nothing below is a screenshot — every card is the
          real <code>@retro-ui/react</code> library rendering that theme&rsquo;s
          chrome, fonts, and tokens. Click any style to open its control panel.
        </p>
        <ul className="hero-stats">
          <li>
            <strong>{themes.length}</strong>
            <span>styles</span>
          </li>
          <li>
            <strong>{engineCount}</strong>
            <span>chrome engines</span>
          </li>
          <li>
            <strong>20+</strong>
            <span>components</span>
          </li>
          <li>
            <strong>1</strong>
            <span>API</span>
          </li>
        </ul>
      </section>

      <div className="toolbar">
        <input
          className="toolbar-search"
          type="search"
          placeholder="Search styles, eras, tags… (e.g. “terminal”, “1998”, “pixel”)"
          aria-label="Search styles"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="toolbar-count">
          {filtered.length} of {themes.length}
        </span>
      </div>

      {grouped.length > 0 ? (
        grouped.map(([era, items]) => (
          <section className="era" key={era}>
            <header className="era-head">
              <h2>{era}</h2>
              <span>{items.length} styles</span>
            </header>
            <div className="cards">
              {items.map((theme) => (
                <StyleCard key={theme.id} theme={theme} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <p className="empty">
          No styles match “{query}”.{" "}
          <button type="button" onClick={() => setQuery("")}>
            Clear search
          </button>
        </p>
      )}
    </main>
  );
}
