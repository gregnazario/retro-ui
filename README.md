# retro-ui

A collection of libraries for **retro looking UIs**. One shared component API — shipped for **React, Vue, and Svelte** — with complete design systems for every expected style.

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
| `@retro-ui/themes` | Design tokens, metadata, and CSS variable maps for every style (framework-agnostic) |
| `@retro-ui/styles` | The shared component CSS: class-based, token-driven, engine-aware |
| `@retro-ui/react` | React components that restyle through those tokens |
| `@retro-ui/vue` | The same components as Vue 3 SFCs |
| `@retro-ui/svelte` | The same components as Svelte 5 files |

Switching styles is a theme change, not a rewrite:

```tsx
<RetroProvider theme="aqua-osx">
  <Window title="Finder">{/* same components, Aqua chrome */}</Window>
</RetroProvider>
```

## Frameworks

Every adapter renders the same class names over the same CSS and tokens, so a
design never changes when you change frameworks. Windows are draggable by
their title bar (opt out with `draggable={false}`), and clicking a window
brings it to the front — in all three frameworks.

**Vue 3**

```vue
<script setup>
import { RetroProvider, Window, Button } from "@retro-ui/vue";
import { getTheme } from "@retro-ui/themes";
</script>

<template>
  <RetroProvider :theme="getTheme('windows-95')">
    <Window title="Welcome">
      <p>Hello from 1995.</p>
      <Button variant="primary">OK</Button>
    </Window>
  </RetroProvider>
</template>
```

**Svelte 5**

```svelte
<script>
  import { RetroProvider, Window, Button } from "@retro-ui/svelte";
  import { getTheme } from "@retro-ui/themes";
</script>

<RetroProvider theme={getTheme("windows-95")}>
  <Window title="Welcome">
    <p>Hello from 1995.</p>
    <Button variant="primary">OK</Button>
  </Window>
</RetroProvider>
```

## Expected styles

Desktop OS, terminals, games, web eras, and graphic systems are all first-class. The demo website renders every style live on a single page; the playground focuses on one style at a time (`#windows-95`, `#gameboy-dmg`, and so on).

### Desktop OS

- Mac System 7, Mac OS 9 Platinum, Mac OS X Aqua
- Windows 95, 98, 2000, XP Luna, 7 Aero
- Amiga Workbench, NeXTSTEP, BeOS, OS/2 Warp, CDE / Motif, TempleOS
- Classic GNOME

### Terminals and computers

- Teletext, CRT Phosphor, DOS CGA, IBM 3270
- NetHack ASCII, BBS ANSI, Midnight Commander
- Matrix Rain, btop Meters, Commodore 64 BASIC
- Jurassic Park UNIX

### Games and apps

- 8-Bit Arcade, Game Boy DMG, PS1 Tech, Winamp Skin
- Red Alert, Warcraft II

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

Type checking runs per package with the right compiler for each adapter —
`tsc` for `@retro-ui/themes` and `@retro-ui/react`, `vue-tsc` for
`@retro-ui/vue`, and `svelte-check` for `@retro-ui/svelte` (plus `tsc` for
both apps):

```bash
pnpm check:packages
```

The same command, the root `tsc` program, the test suites, and production
builds all run in CI (`.github/workflows/ci.yml`). Note that
`packages/themes` and `packages/react` must be built
(`pnpm --filter @retro-ui/themes --filter @retro-ui/react build`) before the
apps' type checks — `tsc` resolves them through `dist/`, while Vite uses
source aliases.

## Demo website

`apps/demo` is the shareable showcase: a gallery that renders every style live
and side by side, a detail page per style with the full control panel, color
tokens, and copy-ready usage snippets for React, Vue, and Svelte, plus a
**Frameworks** page (`#/frameworks`) running React, Vue, and Svelte panels in
the same page — every window draggable.

```bash
pnpm demo          # dev server on :5174
pnpm build:demo    # static build to apps/demo/dist
```

## License

MIT
