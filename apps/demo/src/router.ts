import { useEffect, useState } from "react";

export type Route =
  | { view: "gallery" }
  | { view: "frameworks" }
  | { view: "style"; id: string };

function parse(hash: string): Route {
  const path = hash.replace(/^#/, "");
  if (path === "/frameworks") return { view: "frameworks" };
  const id = path.match(/^\/style\/([a-z0-9-]+)\/?$/i)?.[1];
  return id ? { view: "style", id } : { view: "gallery" };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === "undefined" ? { view: "gallery" } : parse(window.location.hash),
  );

  useEffect(() => {
    const onHash = () => setRoute(parse(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return route;
}
