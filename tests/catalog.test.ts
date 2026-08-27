import { describe, expect, it } from "vitest";
import {
  EXPECTED_STYLE_IDS,
  TOKEN_KEYS,
  getTheme,
  themes,
} from "@retro-ui/themes";

describe("design system catalog", () => {
  it("includes every expected style exactly once", () => {
    expect(themes.map((theme) => theme.id).sort()).toEqual([...EXPECTED_STYLE_IDS].sort());
    expect(new Set(themes.map((theme) => theme.id)).size).toBe(EXPECTED_STYLE_IDS.length);
    expect(new Set(themes.map((theme) => theme.slug)).size).toBe(EXPECTED_STYLE_IDS.length);
  });

  it("gives every style a complete token set, engine, and metadata", () => {
    for (const id of EXPECTED_STYLE_IDS) {
      const theme = getTheme(id);
      expect(theme.name.length).toBeGreaterThan(2);
      expect(theme.description.length).toBeGreaterThan(20);
      expect(theme.year).toBeGreaterThan(1900);
      expect(theme.era.length).toBeGreaterThan(2);
      expect(theme.tags.length).toBeGreaterThan(0);
      expect(theme.fonts.ui).toBeTruthy();
      expect(theme.fonts.mono).toBeTruthy();
      expect(theme.fonts.display).toBeTruthy();
      for (const key of TOKEN_KEYS) {
        expect(theme.tokens[key], `${id} missing token ${key}`).toEqual(expect.any(String));
        expect(theme.tokens[key]!.length, `${id}.${key} empty`).toBeGreaterThan(0);
      }
    }
  });

  it("covers every chrome engine used by the component CSS", () => {
    const engines = new Set(themes.map((theme) => theme.engine));
    expect(engines).toEqual(
      new Set([
        "bevel",
        "luna",
        "aero",
        "system7",
        "platinum",
        "aqua",
        "nextstep",
        "beos",
        "amiga",
        "pixel",
        "terminal",
        "web",
        "soft",
        "graphic",
      ]),
    );
  });
});
