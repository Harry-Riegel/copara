**Input** is the standard text field — Sand fill, hairline border, 46px tall. Focus draws a 2px Wald border; an `error` draws a 2px clay border (never red).

```jsx
<Input label="E-Mail" type="email" placeholder="du@example.de" value={email} onChange={e => setEmail(e.target.value)} />
<Input label="Einladungscode" error="Der Code stimmt nicht. Sieh noch einmal nach." />
```

- Border height is kept stable between the 1px and 2px states, so fields don't jump on focus.
- Error copy is gentle and points to the fix, matching the Banner voice.
