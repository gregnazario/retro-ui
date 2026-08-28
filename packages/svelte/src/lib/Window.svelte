<script lang="ts">
  import { getContext } from "svelte";
  import type { Snippet } from "svelte";
  import { RETRO_THEME_KEY, type RetroThemeContext } from "../context";
  import { bumpWindowStack } from "../windowStack";
  import TitleButton from "./TitleButton.svelte";

  let {
    title,
    active = true,
    status,
    width,
    draggable = true,
    class: className = "",
    style,
    children,
  }: {
    title: string;
    active?: boolean;
    status?: Snippet;
    width?: number | string;
    draggable?: boolean;
    class?: string;
    style?: string;
    children?: Snippet;
  } = $props();

  const themeCtx = getContext<RetroThemeContext | undefined>(RETRO_THEME_KEY);
  const showControls = $derived(themeCtx?.current.controls !== "none");
  const isMac = $derived(themeCtx?.current.controls === "mac");

  let el: HTMLElement | undefined = $state();
  let offset = $state({ x: 0, y: 0 });
  let dragInfo: {
    pointerId: number;
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
  } | null = null;

  function bringToFront() {
    if (el) el.style.zIndex = String(bumpWindowStack());
  }

  function onTitlePointerDown(event: PointerEvent) {
    if (!draggable || event.button !== 0) return;
    if ((event.target as HTMLElement).closest(".retro-titlebar-controls button")) return;
    bringToFront();
    dragInfo = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      baseX: offset.x,
      baseY: offset.y,
    };
    try {
      (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    } catch {
      /* pointer capture unavailable — drag ends on release anyway */
    }
  }

  function onTitlePointerMove(event: PointerEvent) {
    if (!dragInfo || dragInfo.pointerId !== event.pointerId) return;
    offset = {
      x: dragInfo.baseX + event.clientX - dragInfo.startX,
      y: dragInfo.baseY + event.clientY - dragInfo.startY,
    };
  }

  function endDrag(event: PointerEvent) {
    if (dragInfo?.pointerId === event.pointerId) dragInfo = null;
  }

  const styleText = $derived(
    [
      width ? `width: ${typeof width === "number" ? `${width}px` : width}` : "",
      draggable ? `transform: translate(${offset.x}px, ${offset.y}px)` : "",
      style ?? "",
    ]
      .filter(Boolean)
      .join("; "),
  );
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- Dragging is a pointer-only interaction; the window itself stays a plain
     structural section for assistive tech. -->
<section
  bind:this={el}
  class={`retro-window${className ? ` ${className}` : ""}`}
  data-active={active}
  data-draggable={draggable}
  style={styleText}
  onpointerdown={bringToFront}
>
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <header
    class="retro-titlebar"
    onpointerdown={onTitlePointerDown}
    onpointermove={onTitlePointerMove}
    onpointerup={endDrag}
    onpointercancel={endDrag}
  >
    {#if showControls && isMac}
      <div class="retro-titlebar-controls">
        <TitleButton kind="close" />
        <TitleButton kind="min" />
        <TitleButton kind="max" />
      </div>
    {/if}
    <div class="retro-titlebar-title">{title}</div>
    {#if showControls && !isMac}
      <div class="retro-titlebar-controls">
        <TitleButton kind="min" />
        <TitleButton kind="max" />
        <TitleButton kind="close" />
      </div>
    {/if}
  </header>
  <div class="retro-window-body">{@render children?.()}</div>
  {#if status}<div class="retro-window-status">{@render status()}</div>{/if}
</section>
