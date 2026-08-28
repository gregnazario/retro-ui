# retro-ui

A collection of libraries for **retro looking React UIs**. One shared component API, complete design systems for every expected style.

Every style is rendered live, side by side, in the demo website — see [Demo website](#demo-website) for how to run it locally.

```tsx
import { RetroProvider, Window, Button } from "@retro-ui/react";
import { getTheme } from "@retro-ui/themes";

export function App() {
  return (
    <RetroProvider theme={getTheme("windows-95")}>
      <Window title="Welcome">
        <p>Hello from 1995.</p>
        <Button variant="primary">OK</Button>
      </Window>
    </RetroProvider>
  );
}
```

## Packages

| Package | What it is |
| --- | --- |
| `@retro-ui/themes` | Design tokens, metadata, and CSS variable maps for every style |
| `@retro-ui/react` | Accessible React components that restyle through those tokens |

Switching styles is a theme change, not a rewrite:

```tsx
<RetroProvider theme="aqua-osx">
  <Window title="Finder">{/* same components, Aqua chrome */}</Window>
</RetroProvider>
```

## Expected styles

Desktop OS, terminals, games, web eras, and graphic systems are all first-class. The demo website renders every style live on a single page; the playground focuses on one style at a time (`#windows-95`, `#gameboy-dmg`, and so on).

### Desktop OS

- Mac System 7, Mac OS 9 Platinum, Mac OS X Aqua
- Windows 95, 98, 2000, XP Luna, 7 Aero
- Amiga Workbench, NeXTSTEP, BeOS, OS/2 Warp, CDE / Motif, TempleOS

### Terminals and computers

- Teletext, CRT Phosphor, DOS CGA, IBM 3270
- NetHack ASCII, BBS ANSI, Midnight Commander
- Matrix Rain, btop Meters, Commodore 64 BASIC

### Games and apps

- 8-Bit Arcade, Game Boy DMG, PS1 Tech, Winamp Skin

### Web / UI eras

- GeoCities Web 1.0, Web 2.0 Glossy, Frutiger Aero
- Flat 2013, Glassmorphism, Neumorphism, Claymorphism
- Brutalist Web, Default Browser, Y2K Chrome, Maximalist 90s Banner

### Graphic and print

- Cassette Futurism, Vaporwave, Memphis, Braun / Rams
- Tron Vector, VHS Tracking, Risograph, Blueprint / CAD
- Swiss Style, Bauhaus, Pop Art, Op Art
- Hypnagogic, Monochrome Zen, Wireframe Sketch
- Glitch Databend, Duotone Poster, Grid Paper

## Components

`Button`, `TextInput`, `TextArea`, `Select`, `Checkbox`, `Radio`, `Slider`, `Progress`, `Window`, `Desktop`, `TaskBar`, `MenuBar`, `Tabs`, `Fieldset`, `Table`, `ListBox`, `StatusBar`, `Alert`, `Badge`, `Separator`.

Chrome (title-bar controls, bevels, gel buttons, scanlines, traffic lights) comes from each theme's **engine**: `bevel`, `luna`, `aero`, `system7`, `platinum`, `aqua`, `nextstep`, `beos`, `amiga`, `pixel`, `terminal`, `web`, `soft`, `graphic`.

## Develop

```bash
pnpm install
pnpm test
pnpm dev
```

The playground is a live kitchen sink for every style (`#windows-95`, `#gameboy-dmg`, and so on).

## Demo website

`apps/demo` is the shareable showcase: a gallery that renders every style live
and side by side, plus a detail page per style with the full control panel,
color tokens, and a copy-ready usage snippet.

```bash
pnpm demo          # dev server on :5174
pnpm build:demo    # static build to apps/demo/dist
```

## License

MIT
