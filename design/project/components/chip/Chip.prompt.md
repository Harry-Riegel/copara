**Chip** is a small status/label pill. Every Premium element carries the gold `premium` chip; parent tones mark who a thing belongs to.

```jsx
<Chip tone="premium">Premium</Chip>
<Chip tone="apricot">wartet</Chip>
<Chip tone="wald">übernimmt</Chip>
<Chip tone="neutral">aktiv</Chip>
```

- Status words are calm and specific: „wartet", „übernimmt", „aktiv", „offen" — never „Pending" or a red „error" state.
- `premium` uses `--premium-gradient` and is reserved exclusively for Premium features (paywall-gated items).
