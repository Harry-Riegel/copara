**Button** is the pill-shaped action control. Use exactly one `primary` (Wald) button per screen; `secondary` (Sand) and `tertiary` (text) carry lesser actions.

```jsx
<Button variant="primary" size="large" onClick={send}>Anfrage senden</Button>
<Button variant="secondary">Gegenvorschlag</Button>
<Button variant="tertiary">Später</Button>
```

- Sizes: `small` 36px, `medium` 46px, `large` 56px. Touch targets ≥ 44px, so avoid `small` for standalone taps.
- `loading` shows a calm spinner; `disabled` drops to 0.4 opacity; press dims to 0.8.
- Copy is calm and de-escalating: „Bestätigen" / „Gegenvorschlag" / „Später" — never „Ablehnen".
