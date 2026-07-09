**Sheet** is the bottom sheet used for every focused task — request flow, day editing, add-person, settings. 32px top radius, drag handle, slow 320ms ease-up.

```jsx
<Sheet open={open} onClose={() => setOpen(false)} height="58%">
  <h2 style={{ fontFamily: 'var(--font-heading)' }}>Wechsel anfragen</h2>
  {/* … */}
</Sheet>
```

- Positions absolutely against the nearest positioned ancestor — mount it inside the phone-frame screen, not the page body.
- Backdrop is `--backdrop` with no blur; tap it to close. Content scrolls; keep the primary action pinned at the bottom.
