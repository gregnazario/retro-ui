# retro-ui demo website

The shareable showcase for every retro-ui style. The playground is a dev
kitchen sink for one style at a time; this app shows **all of them at once**.

```bash
pnpm demo          # dev server on http://localhost:5174
pnpm build:demo    # static production build in apps/demo/dist
pnpm --filter @gregnazario/retro-ui-demo exec tsc --noEmit   # typecheck
```

The production build is plain static files (hash routing, no server runtime),
so `dist/` can be deployed to any static host.

## Pages

- `#/` — Gallery. Era-grouped sections with a search box. Every card is a
  **live thumbnail**: the real `@gregnazario/retro-ui-react` components rendering a small
  window in that theme via `RetroProvider` — not a screenshot. The stage is
  `pointer-events: none` and an overlay link makes the whole card clickable.
- `#/style/<id>` — Detail page for one style: the full interactive control
  panel (draggable windows, taskbar, tabs, About dialog), a copy-ready usage
  snippet switchable between React / Vue / Svelte, color-token swatches, and
  previous/next pager links.
- `#/frameworks` — The same window rendered live by React, Vue, and Svelte
  side by side (via small mount-host wrappers), proving the adapters share one
  API and one look. Each panel is fully interactive and draggable.

## Structure

| File | Role |
| --- | --- |
| `src/App.tsx` | Site shell: top bar, footer, route switch |
| `src/router.ts` | Tiny hash router (`#/` and `#/style/:id`) |
| `src/Gallery.tsx` | Hero, search, era sections, card grid |
| `src/StyleCard.tsx` | Live thumbnail card for one theme |
| `src/Detail.tsx` | Detail page: header, tokens, snippet, pager |
| `src/ThemeDemo.tsx` | Full control-panel scene rendered in the active theme |
| `src/site.css` | Neutral dark shell so the theme previews pop |

## Notes

- Everything style-related is data-driven from `@gregnazario/retro-ui-themes`; a new theme
  appears in the gallery automatically, no demo changes needed.
- Card stages compact the library chrome slightly (`.card-stage` overrides in
  `site.css`: smaller desktop padding, no window `min-width`) so uniform grid
  cells can render at natural font size.
- Web fonts come from the Google Fonts link in `index.html`; it must keep
  covering the font stacks declared in `packages/themes/src/helpers.ts`.
