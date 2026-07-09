**Icon** renders a Lucide outline glyph tinted via `color`; use it wherever the product shows an icon — always next to a text label, never alone.

```jsx
<Icon name="calendar" size={20} color="var(--wald-700)" />
```

- Outline set copied from `lucide-static` (matches the app's `lucide-react-native`): 2px stroke, round caps, 24×24 viewBox.
- Typical sizes: 16–20px in rows, ~23px in the tab bar. Active tab `var(--wald-700)`, inactive `var(--ink-400)`.
- Common names: `house`, `list-checks`, `calendar`, `users`, `plus`, `arrow-left-right`, `crown`, `eye`, `map-pin`, `clock`, `send`, `bell`, `check`, `chevron-left`/`chevron-right`. Full list in `Icon.d.ts` / `icons-data.js`.
- No emoji, no icon font, no unicode glyphs — add new glyphs to `icons-data.js` from lucide-static.
