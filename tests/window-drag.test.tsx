import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RetroProvider, Window } from "@retro-ui/react";

function dispatchPointer(el: Element, type: string, x: number, y: number) {
  el.dispatchEvent(
    new MouseEvent(type, { bubbles: true, cancelable: true, clientX: x, clientY: y, button: 0 }),
  );
}

describe("react window interactions", () => {
  it("drags windows by the titlebar", async () => {
    render(
      <RetroProvider theme="windows-95">
        <Window title="Drag me" />
      </RetroProvider>,
    );
    const titlebar = screen.getByText("Drag me").closest(".retro-titlebar")!;
    await act(async () => {
      dispatchPointer(titlebar, "pointerdown", 100, 100);
      dispatchPointer(titlebar, "pointermove", 140, 130);
      dispatchPointer(titlebar, "pointerup", 140, 130);
    });
    const win = screen.getByText("Drag me").closest(".retro-window") as HTMLElement;
    expect(win.style.transform).toBe("translate(40px, 30px)");
  });

  it("does not drag when grabbing titlebar buttons", async () => {
    render(
      <RetroProvider theme="windows-95">
        <Window title="Stay put" />
      </RetroProvider>,
    );
    const close = screen.getByLabelText("Close");
    const titlebar = screen.getByText("Stay put").closest(".retro-titlebar")!;
    await act(async () => {
      dispatchPointer(close, "pointerdown", 10, 10);
      dispatchPointer(titlebar, "pointermove", 60, 60);
      dispatchPointer(titlebar, "pointerup", 60, 60);
    });
    const win = screen.getByText("Stay put").closest(".retro-window") as HTMLElement;
    expect(win.style.transform).toBe("translate(0px, 0px)");
  });

  it("brings the clicked window to the front", async () => {
    render(
      <RetroProvider theme="windows-95">
        <Window title="First" />
        <Window title="Second" />
      </RetroProvider>,
    );
    const second = screen.getByText("Second").closest(".retro-window") as HTMLElement;
    const first = screen.getByText("First").closest(".retro-window") as HTMLElement;
    await act(async () => {
      dispatchPointer(second, "pointerdown", 5, 5);
    });
    const secondZ = Number(second.style.zIndex);
    await act(async () => {
      dispatchPointer(first, "pointerdown", 5, 5);
    });
    expect(Number(first.style.zIndex)).toBeGreaterThan(secondZ);
    expect(secondZ).toBeGreaterThan(0);
  });

  it("can opt out of dragging", async () => {
    render(
      <RetroProvider theme="windows-95">
        <Window title="Fixed" draggable={false} />
      </RetroProvider>,
    );
    const titlebar = screen.getByText("Fixed").closest(".retro-titlebar")!;
    await act(async () => {
      dispatchPointer(titlebar, "pointerdown", 100, 100);
      dispatchPointer(titlebar, "pointermove", 140, 130);
    });
    const win = screen.getByText("Fixed").closest(".retro-window") as HTMLElement;
    expect(win.style.transform).toBe("");
    expect(win.getAttribute("data-draggable")).toBe("false");
  });
});
