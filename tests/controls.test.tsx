import { act, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Button,
  Dialog,
  Menu,
  RetroProvider,
  Toggle,
  Tooltip,
} from "@gregnazario/retro-ui-react";

describe("interactive controls", () => {
  it("renders the switch and flips it through onChange", async () => {
    let value = false;
    render(
      <RetroProvider theme="windows-95">
        <Toggle label="Turbo" checked={value} onChange={(next) => (value = next)} />
      </RetroProvider>,
    );
    const toggle = screen.getByRole("switch", { name: "Turbo" });
    expect(toggle).toHaveAttribute("aria-checked", "false");
    await act(async () => {
      toggle.click();
    });
    expect(value).toBe(true);
  });

  it("opens the menu, runs the item handler, and closes", async () => {
    const picked = vi.fn();
    render(
      <RetroProvider theme="windows-95">
        <Menu
          label="Actions"
          items={[{ label: "Refresh", onClick: picked }, { label: "Noop" }]}
        />
      </RetroProvider>,
    );
    expect(screen.queryByRole("menu")).toBeNull();

    await act(async () => {
      screen.getByRole("button", { name: "Actions" }).click();
    });
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await act(async () => {
      screen.getByRole("menuitem", { name: "Refresh" }).click();
    });
    expect(picked).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("closes the menu on an outside pointerdown", async () => {
    render(
      <RetroProvider theme="windows-95">
        <Menu label="Actions" items={[{ label: "Noop" }]} />
      </RetroProvider>,
    );
    await act(async () => {
      screen.getByRole("button", { name: "Actions" }).click();
    });
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await act(async () => {
      document.body.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true }));
    });
    expect(screen.queryByRole("menu")).toBeNull();
  });

  it("renders nothing when the dialog is closed", () => {
    render(
      <RetroProvider theme="windows-95">
        <Dialog open={false} title="About" onClose={() => undefined}>
          Hidden
        </Dialog>
      </RetroProvider>,
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes the dialog on Escape and on backdrop clicks", async () => {
    const onClose = vi.fn();
    const { container } = render(
      <RetroProvider theme="windows-95">
        <Dialog open title="About" onClose={onClose}>
          <Button>OK</Button>
        </Dialog>
      </RetroProvider>,
    );
    expect(screen.getByRole("dialog", { name: "About" })).toBeInTheDocument();

    await act(async () => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(onClose).toHaveBeenCalledTimes(1);

    const backdrop = container.querySelector(".retro-dialog-backdrop")!;
    await act(async () => {
      backdrop.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true }));
    });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("wraps tooltip content with its text", () => {
    const { container } = render(
      <RetroProvider theme="windows-95">
        <Tooltip text="Opens the about dialog">
          <Button>About…</Button>
        </Tooltip>
      </RetroProvider>,
    );
    const wrapper = container.querySelector(".retro-tooltip")!;
    expect(wrapper.getAttribute("data-text")).toBe("Opens the about dialog");
    expect(wrapper.querySelector(".retro-button")).toBeTruthy();
  });
});
