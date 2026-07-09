**Card** is the standard content surface — Sand-0 fill, 24px radius. A card is *either* softly elevated *or* hairline-bordered, never both.

```jsx
<Card elevated>
  <h3 style={{ fontFamily: 'var(--font-heading)' }}>Wer übernimmt den 28. Februar?</h3>
</Card>
```

- `elevated` adds the warm soft shadow (`--shadow-card`) and drops the border — use for the one card that should lift off the screen.
- Flat (default) uses a `--sand-200` hairline — use for list-like stacks where a shadow on each would be noisy.
- Default padding is 16px; override via `style` (18–20px is common on hero cards).
