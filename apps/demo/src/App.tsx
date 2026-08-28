import { themes } from "@retro-ui/themes";
import { Detail } from "./Detail";
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
          </nav>
        </div>
      </header>
      {route.view === "gallery" ? (
        <Gallery />
      ) : (
        <Detail key={route.id} id={route.id} />
      )}
      <footer className="site-footer">
        <p>
          Rendered live by <code>@retro-ui/react</code> and{" "}
          <code>@retro-ui/themes</code> — one component API, every style. MIT
          licensed.
        </p>
      </footer>
    </div>
  );
}
