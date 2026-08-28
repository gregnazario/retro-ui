import { themes } from "@gregnazario/retro-ui-themes";
import { Detail } from "./Detail";
import { Frameworks } from "./Frameworks";
import { Gallery } from "./Gallery";
import { useRoute } from "./router";

export function App() {
  const route = useRoute();

  return (
    <div className="site">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#/">
            <span className="brand-mark" aria-hidden="true">
              ▚▞
            </span>
            retro-ui
          </a>
          <nav className="topbar-nav">
            <span className="topbar-count">{themes.length} styles</span>
            <a href="#/">Gallery</a>
            <a href="#/frameworks">Frameworks</a>
          </nav>
        </div>
      </header>
      {route.view === "gallery" ? (
        <Gallery />
      ) : route.view === "frameworks" ? (
        <Frameworks />
      ) : (
        <Detail key={route.id} id={route.id} />
      )}
      <footer className="site-footer">
        <p>
          React, Vue, and Svelte components over one shared token and CSS core —
          one component API, every style. MIT licensed.
        </p>
      </footer>
    </div>
  );
}
