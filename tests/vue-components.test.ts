import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import { describe, expect, it } from "vitest";
import { Button, RetroProvider, Tabs, TextInput, Window } from "@gregnazario/retro-ui-vue";
import { EXPECTED_STYLE_IDS, getTheme } from "@gregnazario/retro-ui-themes";

function dispatchPointer(el: Element, type: string, x: number, y: number) {
  el.dispatchEvent(
    new MouseEvent(type, { bubbles: true, cancelable: true, clientX: x, clientY: y, button: 0 }),
  );
}

describe("vue themed components", () => {
  it("renders the same panel through every expected style", () => {
    for (const id of EXPECTED_STYLE_IDS) {
      const theme = getTheme(id);
      const wrapper = mount(RetroProvider, {
        props: { theme },
        slots: {
          default: () => [
            h(Window, { title: `${theme.name} — Panel` }, {
              default: () => [
                h(TextInput, { defaultValue: "retro" }),
                h(Button, { variant: "primary" }, { default: () => "OK" }),
              ],
            }),
          ],
        },
      });
      expect(wrapper.element.getAttribute("data-theme")).toBe(id);
      expect(wrapper.element.querySelector(".retro-window")).toBeTruthy();
      expect(wrapper.text()).toContain("OK");
      wrapper.unmount();
    }
  });

  it("switches tabs on click", async () => {
    const wrapper = mount(RetroProvider, {
      props: { theme: "windows-95" },
      slots: {
        default: () => [
          h(Tabs, {
            tabs: [
              { id: "a", label: "Alpha", content: h("p", "alpha panel") },
              { id: "b", label: "Beta", content: h("p", "beta panel") },
            ],
          }),
        ],
      },
    });
    expect(wrapper.text()).toContain("alpha panel");
    await wrapper.findAll(".retro-tab")[1]!.trigger("click");
    expect(wrapper.text()).toContain("beta panel");
  });

  it("drags windows by the titlebar", async () => {
    const wrapper = mount(RetroProvider, {
      props: { theme: "windows-95" },
      slots: { default: () => [h(Window, { title: "Drag me" })] },
    });
    const titlebar = wrapper.element.querySelector(".retro-titlebar")!;
    dispatchPointer(titlebar, "pointerdown", 100, 100);
    dispatchPointer(titlebar, "pointermove", 140, 130);
    dispatchPointer(titlebar, "pointerup", 140, 130);
    await nextTick();
    const win = wrapper.element.querySelector(".retro-window") as HTMLElement;
    expect(win.style.transform).toBe("translate(40px, 30px)");
  });

  it("does not drag when grabbing titlebar buttons", async () => {
    const wrapper = mount(RetroProvider, {
      props: { theme: "windows-95" },
      slots: { default: () => [h(Window, { title: "Stay put" })] },
    });
    const close = wrapper.element.querySelector(".retro-titlebar-controls button")!;
    dispatchPointer(close, "pointerdown", 10, 10);
    const titlebar = wrapper.element.querySelector(".retro-titlebar")!;
    dispatchPointer(titlebar, "pointermove", 60, 60);
    dispatchPointer(titlebar, "pointerup", 60, 60);
    await nextTick();
    const win = wrapper.element.querySelector(".retro-window") as HTMLElement;
    expect(win.style.transform).toBe("translate(0px, 0px)");
  });
});
