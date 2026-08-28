import { useEffect, useRef } from "react";
import { mount, unmount, type Component } from "svelte";

export function SvelteHost({
  component,
  props,
}: {
  component: Component<Record<string, unknown>>;
  props?: Record<string, unknown>;
}) {
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const instance = mount(component, { target: el, props });
    return () => {
      void unmount(instance);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [component]);

  return <div ref={holder} />;
}
