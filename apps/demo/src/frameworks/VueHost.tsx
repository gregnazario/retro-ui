import { useEffect, useRef } from "react";
import { createApp, type Component } from "vue";

export function VueHost({
  component,
  props,
}: {
  component: Component;
  props?: Record<string, unknown>;
}) {
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const app = createApp(component, props);
    app.mount(el);
    return () => app.unmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);

  return <div ref={holder} />;
}
