import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, Desktop, RetroProvider, TaskBar, Window } from "@gregnazario/retro-ui-react";
import { EXPECTED_STYLE_IDS, getTheme } from "@gregnazario/retro-ui-themes";
import { KitchenSink } from "../apps/playground/src/KitchenSink";

describe("themed components", () => {
  it("renders the same control panel through every expected style", () => {
    for (const id of EXPECTED_STYLE_IDS) {
      const theme = getTheme(id);
      const { unmount } = render(
        <RetroProvider theme={theme}>
          <KitchenSink theme={theme} />
        </RetroProvider>,
      );
      expect(screen.getByText(`${theme.name} — Control Panel`)).toBeInTheDocument();
      expect(screen.getAllByRole("button", { name: "OK" }).length).toBeGreaterThan(0);
      unmount();
    }
  });

  it("exposes theme data attributes for CSS engines", () => {
    const { container } = render(
      <RetroProvider theme="windows-95">
        <Window title="Welcome">
          <Button>OK</Button>
        </Window>
      </RetroProvider>,
    );
    const root = container.querySelector(".retro-root");
    expect(root).toHaveAttribute("data-theme", "windows-95");
    expect(root).toHaveAttribute("data-engine", "bevel");
  });
});

describe("taskbar positioning", () => {
  it("places the panel per theme: macOS top, Windows bottom", () => {
    const mac = render(
      <RetroProvider theme="aqua-osx">
        <Desktop taskbar={<TaskBar startLabel={null} clock={<span>12:00</span>} />}>
          <Window title="Welcome" width={280} />
        </Desktop>
      </RetroProvider>,
    );
    expect(mac.container.querySelector(".retro-taskbar")).toHaveAttribute(
      "data-position",
      "top",
    );
    expect(mac.container.querySelector(".retro-desktop")).toHaveAttribute(
      "data-panel",
      "top",
    );
    expect(mac.container.querySelector(".retro-start")).toBeNull();
    mac.unmount();

    const win = render(
      <RetroProvider theme="windows-95">
        <Desktop taskbar={<TaskBar />}>
          <Window title="Welcome" width={280} />
        </Desktop>
      </RetroProvider>,
    );
    expect(win.container.querySelector(".retro-taskbar")).toHaveAttribute(
      "data-position",
      "bottom",
    );
  });
});
