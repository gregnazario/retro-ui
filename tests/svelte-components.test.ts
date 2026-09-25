import { render } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import { EXPECTED_STYLE_IDS, getTheme } from "@gregnazario/retro-ui-themes";
import SveltePanel from "./fixtures/SveltePanel.svelte";
import { Dialog, Menu, Toggle } from "@gregnazario/retro-ui-svelte";

function dispatchPointer(el: Element, type: string, x: number, y: number) {
  el.dispatchEvent(
    new MouseEvent(type, { bubbles: true, cancelable: true, clientX: x, clientY: y, button: 0 }),
  );
}

describe("svelte themed components", () => {
  it("renders the same panel through every expected style", () => {
    for (const id of EXPECTED_STYLE_IDS) {
      const theme = getTheme(id);
      const { container, unmount } = render(SveltePanel, {
        props: { themeId: id, title: `${theme.name} — Panel` },
      });
      expect(container.querySelector(".retro-root")?.getAttribute("data-theme")).toBe(id);
      expect(container.querySelector(".retro-window")).toBeTruthy();
      expect(container.textContent).toContain("OK");
      unmount();
    }
  });

  it("switches tabs on click", async () => {
    const { container, getAllByRole } = render(SveltePanel, {
      props: { themeId: "windows-95" },
    });
    expect(container.textContent).toContain("alpha panel");
    getAllByRole("tab")[1]!.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(container.textContent).toContain("beta panel");
  });

  it("drags windows by the titlebar", async () => {
    const { container } = render(SveltePanel, {
      props: { themeId: "windows-95", title: "Drag me" },
    });
    const titlebar = container.querySelector(".retro-titlebar")!;
    dispatchPointer(titlebar, "pointerdown", 100, 100);
    dispatchPointer(titlebar, "pointermove", 140, 130);
    dispatchPointer(titlebar, "pointerup", 140, 130);
    await new Promise((resolve) => setTimeout(resolve, 0));
    const win = container.querySelector(".retro-window") as HTMLElement;
    expect(win.style.transform).toBe("translate(40px, 30px)");
  });

  it("fires the switch onChange with the next value", async () => {
    const changed = vi.fn();
    const { container } = render(Toggle, {
      props: { label: "Power", checked: false, onChange: changed },
    });
    const toggle = container.querySelector('[role="switch"]') as HTMLElement;
    expect(toggle.getAttribute("aria-checked")).toBe("false");
    toggle.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(changed).toHaveBeenCalledWith(true);
  });

  it("opens the menu and runs the item handler", async () => {
    const picked = vi.fn();
    const { container } = render(Menu, {
      props: { label: "Actions", items: [{ label: "Go", onClick: picked }] },
    });
    (container.querySelector(".retro-menu button") as HTMLElement).click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(container.querySelector('[role="menu"]')).toBeTruthy();
    (container.querySelector('[role="menuitem"]') as HTMLElement).click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(picked).toHaveBeenCalledOnce();
    expect(container.querySelector('[role="menu"]')).toBeNull();
  });

  it("calls dialog onClose on Escape", async () => {
    const onClose = vi.fn();
    render(Dialog, {
      props: { open: true, title: "About", onClose },
    });
    expect(document.querySelector('[role="dialog"]')).toBeTruthy();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(onClose).toHaveBeenCalledOnce();
  });
});

