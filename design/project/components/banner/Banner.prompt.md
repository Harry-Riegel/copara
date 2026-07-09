**Banner** is a calm inline note on a Sand-100 fill. The tone tints only the 18px icon — the surface stays the same warm sand, so nothing shouts.

```jsx
<Banner tone="info">Hier erscheinen Anfragen, sobald du oder Markus eine sendet.</Banner>
<Banner tone="error" onDismiss={close}>Das hat gerade nicht geklappt. Versuch es noch einmal.</Banner>
```

- `error` uses clay (`#B07060`), never red. Error copy is gentle and actionable.
- Pass `onDismiss` to add an `x` button. Keep messages one calm sentence.
