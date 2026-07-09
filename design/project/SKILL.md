---
name: copara-design
description: Use this skill to generate well-branded interfaces and assets for Copara, the calm shared-custody calendar for separated parents (DACH, German-first, mobile). Either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping in the „Warm Sand & Wald" language.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

Start here:
- `readme.md` — full brand guide: content voice (German, du-form, no emoji, „Später" not „Ablehnen"), visual foundations („Warm Sand & Wald"), the Status-Ampel system, iconography, and the component/UI-kit index.
- `styles.css` + `tokens/` — copy `styles.css` and link it; it `@import`s every token file and declares the webfonts in `assets/fonts/`.
- `components/` — Button, Input, Card, Banner, Sheet, Chip, Avatar, Icon (each with `.d.ts` props + `.prompt.md` usage). Mount from the compiled `_ds_bundle.js` via `window.CoparaDesignSystem_e5ed8c`.
- `guidelines/` — foundation specimen cards (colors incl. Status-Ampel, type, spacing, brand voice).
- `ui_kits/copara-app/` — the interactive 3-tab app recreation (To-Do · Kalender · Familie + Plus + Konto) to copy screen structure from.

Hard rules to honour: German only, sentence case, no emoji; never red (errors are Clay); never „Ablehnen"; one primary action per screen; touch targets ≥ 44px; Premium elements always carry the gold chip; no logo — set the wordmark „Copara." in Bricolage Grotesque 700 with an apricot dot.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask a few questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
