# Copara Design System

**Copara** is a calm, shared-custody calendar for divorced and separated parents in the DACH market — every swap, request, and handoff lives in one neutral place instead of a WhatsApp thread. Built by Harry Riegel, a co-parent himself. German-first, mobile-only (Expo / React Native, iOS + Android).

- **Tagline:** „Getrennt und trotzdem zusammen!" — the one sanctioned exclamation mark. In UI copy the rule still holds: at most a single „Geschafft.".
- **Brand personality:** *the Calm Mediator* — neutral, never takes sides, lets structure do the soothing.
- **Design language (Redesign 2026):** „Warm Sand & Wald" — Headspace warmth, made grown-up.

This project is the **written-back, current** state of the system: the **3-tab information architecture** (To-Do · Kalender · Familie + Plus + Konto), the **Status-Ampel** colour system, **Fokus-Modus**, and **Patchwork** support (parents count *per child*, third co-parent colour Schiefer). Earlier snapshots described 4 tabs and an old error-clay ramp; those are superseded here.

## SYSTEMIK — the guiding principle
Copara is a tool for a **family system** (parents + grandparents + helpers around the children), not a calendar tool. The surface is optimised for that:
- **Children at the centre, adults as the carrying circle.** The family tab visualises the system; open communication reads as a warm connection, never an alarm.
- **Status before structure.** The home screen answers „Wo sind die Kinder? Muss ich etwas tun?" without thinking — the calendar is one tab behind it.
- **One request flow for the whole system:** recipient choice „An Markus" / „An alle (erste Zusage gewinnt)" / „Nur an Oma & Opa".
- **Relief, not escalation.** If nobody answers, the system steps in (Notfall-Helfer), not the conflict.
- **Symmetry.** What one parent sees/can do, the other sees/can do. Third parties see only their slice.

## Information architecture (Redesign, binding)
Three tabs + a floating Plus + Konto via the avatar.
1. **To-Do** — *everything that needs a decision.* Incoming requests, votes, broadcast status, and your own waiting requests („Liegt bei …"). Apricot dot on the tab while something is open.
2. **Kalender** — *what has been decided.* Who is where (parent colour coding), agreed appointments („Als Nächstes"), change by tapping. Nothing decidable lives here.
3. **Familie** — members & roles (per child), child info, Premium, „Als Oma Anna ansehen", add a person.
- **Plus (FAB, Wald):** one request for the whole system — recipient choice, Ein Tag / Zeitraum / Serie.
- **Konto (via avatar):** profile, Anzeige (incl. **Fokus-Modus** toggle), Verlauf, notifications, sync, Premium, stats & PDF export, privacy.

## PREMIUM (€4,99 / Monat · one purchase per family)
Free carries the family (2 parents + 1 child, shared calendar, swaps between parents, native sync, push). Premium carries the net (more caregivers + their scoped views · „An alle" & „Nur an Großeltern" · Notfall-Helfer escalation · more children & per-child calendars · „Copara denkt mit" AI hints · monthly stats). **Premium elements always carry the gold `Chip` („Premium")**; locked options open the paywall on tap — never greyed-out-dead.

## Sources
- **Design-system origin:** ported from the bound **„Swapp/Copara Design System"** (`_ds/swapp-design-system-…`) that shipped with the „Tiefgreifende Design-Runde" handoff project — tokens, fonts, and the compiled component + UI-kit bundle. This project reconstructs those sources and folds in the redesign.
- **Redesign handoff:** `design_handoff_copara/` (PROJECT_RULES.md = founder decisions; README.md = full screen specs; `tokens-ampel.css`, `tokens-personen.css`).
- **Codebase (the real app):** https://github.com/Harry-Riegel/parentingapp (branch `phase-0/foundation-and-setup`) — tokens in `tailwind.config.ts` + `global.css`, UI primitives in `src/components/ui/`, screens in `app/`, German copy in `locales/de/`. Explore this repo to design even more faithfully against the product.
- **Repo attached by the user:** https://github.com/Harry-Riegel/copara — currently an **empty repository** (no readable tree at the time of writing); nothing could be pulled from it. Explore it later for updated product source once it has content.

## CONTENT FUNDAMENTALS
- **Handlungsentlastung zuerst (hard rule).** The biggest line answers „Muss ich aktiv werden?" — „Heute ist nichts zu tun." sits *above* the context („Mia & Felix sind bei Markus."). Relief or task first, details second.
- **Relativ zuerst, Datum danach (hard rule).** „Du bist erst in 6 Tagen wieder gefragt — am Mo, 16. Februar, 8:00 · Übergabe Schule." Never a bare date.
- **German only.** No English fallback labels — ever. Informal „du", sentence case everywhere (no Title Case, no ALL CAPS).
- **Calm, specific, never blaming.** State facts and next steps, not feelings: „Anfrage gesendet — Markus hat 24 h Zeit zu antworten." Neutral toward the co-parent: „Noch keine Antwort. Erinnerung schicken?" — never „Markus hat wieder nicht geantwortet."
- **Reframe friction words (hard rule).** „Später" statt „Ablehnen", „Gegenvorschlag" statt „Counter", „Anfrage offen" statt „Pending".
- **Exclamation marks:** at most one „Geschafft." per real completion (plus the tagline). **Emoji: never.** No 🎉, no „Yay!".
- **Errors are gentle and actionable:** „Das hat gerade nicht geklappt. Versuch es noch einmal." Never „Fehler!".
- **Empty states explain, don't mope:** „Hier erscheinen Anfragen, sobald du oder Markus eine sendet."
- **Trust copy:** belonging first, law second — „Nur eure Familie — sonst niemand. Niemals verkauft, niemals geteilt." Legal basis small „(DSGVO)". Never infrastructure language („EU-Server", „Cloud") in the UI.
- No therapy or legal language: no „Konfliktlösung", no „deeskalieren", no „Document ID".

## VISUAL FOUNDATIONS — „Warm Sand & Wald"
- **Palette.** Deep forest green `#2E4B3F` (Wald — primary, parent A) carries; apricot `#E8A87C`/`#C67E5C` (parent B, open requests) warms; sand surfaces (`#FAF8F3` screen, `#FFFFFF` card, `#F2EDE2` well); warm ink trio (`#2A2721` / `#6B675C` / `#A39C8C`). Premium-gold gradient `#C67E5C→#D9B36A` is **exclusively** Premium. Semantics: success `#3E6553`, warning `#C4956A`, **error muted Clay `#B07060` — never red**.
- **Status-Ampel (core system).** One warmth scale; meaning always rides on **word + dot**, colour only reinforces. Salbei gradient = „Alles geregelt" (dark ink on light), helles Apricot = „Bald dran" (no forced button), Blush = „Jetzt zu tun" (white ink). Never alarm-red, never brown-grey. Box anatomy is fixed: dot + state word → biggest line (task/all-clear) → one context line → at most one button.
- **Parent colour coding.** Wald = parent A, Aprikose = parent B, **Schiefer** `#6F8196` = parent C (patchwork). Always symmetric, applied per child in calendar cells, avatars, stats. Third parties stay neutral sand.
- **Backgrounds.** Flat warm sand, everywhere. The Premium-gold gradient and the Status-hero gradients are the only gradients. No textures, no imagery, no photos.
- **Type.** Bricolage Grotesque for headlines (700 display, 600 headings — warm, characterful), Inter for body (400/500/600), JetBrains Mono for codes/timestamps. Scale: display 36/1.2/-0.01em, h1 28, h2 22, h3 18, base 16/1.55, sm 14, caption 12/+0.02em.
- **Spacing.** 4px base (4–96). Screens pad 16–20. Generous — one primary action per screen. Touch targets ≥ 44px.
- **Radii.** 12 (inputs/banner), 16 (day cells), 24 (cards), 32 (sheets top), **pill** for buttons & chips. Soft, never bubbly.
- **Shadows.** Warm-tinted, never black: card `0 1px 2px + 0 8px 28px rgba(74,58,33,.04/.07)`, sheet `0 16px 48px rgba(50,40,20,.18)`. A card is shadow **or** hairline (`#EAE4D8`), never both.
- **Borders.** Hairline `#EAE4D8`. Inputs: 1px sand-200 → 2px Wald focus → 2px clay error.
- **Motion.** Slow and reassuring. Default 200ms `cubic-bezier(.32,.72,0,1)`; sheets 320ms `cubic-bezier(.16,1,.3,1)`. No bounces, no loops, no countdown pressure. Press opacity 0.8, disabled 0.4, backdrop `rgba(42,39,33,.32)` with no blur.
- **Imagery.** None. Avatars are initials circles in parent colour coding, never photos.
- **Anti-patterns (hard).** Never red; never „Ablehnen"; no gamification; no legal aesthetic; no asymmetry between parents; no bluish-purple gradients; no emoji cards.

## ICONOGRAPHY
- **Icon system: Lucide** (the app uses `lucide-react-native`). Outline, 24×24 viewBox, 2px stroke, round caps/joins, `currentColor`.
- Copies of the glyphs the product uses live inline in `components/icon/icons-data.js` (from `lucide-static@0.462.0`, ISC license); `components/icon/Icon.jsx` renders them so they tint via `color`. **This is a data set, not hand-drawn SVG** — add new glyphs by copying from lucide-static.
- Known usages: tab bar `list-checks`, `calendar`, `users`, `plus`; flows `info`, `alert-circle`, `x`, `arrow-left-right`, `map-pin`, `clock`, `crown`, `eye`, `user-plus`, `timer`, `send`, `bell`, `check`, `chevron-left`/`chevron-right`, `shield`, `heart-handshake`.
- Typical sizes: 16–20px in rows, ~23px in the tab bar. Active tab `--wald-700`, inactive `--ink-400`. **Icons always accompany a label** — they never carry meaning alone. No icon font, no emoji-as-icons, no unicode glyphs.
- **Logo (2026) — ein Zeichen, drei Bedeutungsebenen (bindende Erzähl-Reihenfolge):**
  1. *Emotional:* zwei Eltern-Kreise, verbunden nur über den Punkt in der Mitte — das Kind. Die Kreise berühren den Punkt, nie einander. Immer die erste Lesart.
  2. *Semantisch:* verschränkt gelesen wird der helle Ring (er läuft hinter dem Aprikose-Ring) zum offenen **C**, der Aprikose-Ring zum **O** — „CO" wie Co-Parenting. Der zweite Blick, nie der Pitch-Einstieg.
  3. *Praktisch:* **.co** ist die Domain — copara.co zitiert das Zeichen.

  **Zwei Posen, ein System:** Die *Story-Pose* (`assets/logo.svg` — getrennte Kreise, Kontakt nur am Punkt; animiert auf dem App-Start: Umarmung → Geburt des Punkts → Trennung → Wiederverbindung) für große Flächen und Motion. Die *Monogramm-Pose „CO"* (`assets/logo-monogram.svg` für helle Flächen; `assets/favicon.svg` auf tiefem Wald) für App-Icon, Favicon und Avatare — lesbar ab 16px. **Domain-Lockup:** „copara.co" in Bricolage 700, der Punkt vor „co" immer in Aprikose. Die Wortmarke **„Copara."** trägt denselben Aprikose-Punkt — er zitiert den Kind-Punkt. Vollständige Spezifikation: `guidelines/brand-wordmark.html`.

## Components (`components/` — the full source inventory from `src/components/ui/` + redesign additions)
Reusable React primitives, each a `<Name>.jsx` with a sibling `.d.ts` and `.prompt.md`, one `@dsCard` specimen per directory:
- **Button** — pill; primary Wald / secondary Sand / tertiary Text; sizes 36 / 46 / 56; loading, disabled.
- **Input** — label, error; sand fill; 2px Wald focus, 2px clay error (never red).
- **Card** — sand-0 surface, radius 24; `elevated` (warm shadow) *or* hairline, never both.
- **Banner** — info / warning / error; sand-100 fill; the tone tints only the 18px icon.
- **Sheet** — bottom sheet; 32px top radius, drag handle, 320ms ease, backdrop without blur.
- **Chip** — status / Premium pill; premium (gold gradient), wald / apricot / schiefer / neutral.
- **Avatar** — initials circle in parent colour coding (wald / apricot / schiefer / neutral) — never photos.
- **Icon** — Lucide outline wrapper (`Icon` + `LUCIDE_ICONS` data).

**Intentional additions** (not in the raw `src/components/ui/`): `Icon`, `Chip`, `Avatar` carry the icon set and the Premium/family flows of the redesign. Avatar/Chip gained a `schiefer` tone for patchwork.

## Index (root manifest)
- `styles.css` — global entry; `@import`s everything in `tokens/`.
- `tokens/` — `colors.css`, `status-ampel.css`, `personen.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css`. Fonts self-hosted in `assets/fonts/`.
- `components/` — button, input, card, banner, sheet, chip, avatar, icon (each: `.jsx` + `.d.ts` + `.prompt.md` + specimen card).
- `guidelines/` — foundation specimen cards: Colors (wald, apricot, neutrals, parents, semantic, **ampel**), Type (headings, body, mono), Spacing (scale, radius-shadows, motion), Brand (wordmark, voice-antworten, voice-do-dont, systemik).
- `ui_kits/copara-app/` — interactive 3-tab recreation (To-Do, Kalender, Familie, Plus request flow, Person hinzufügen, Konto with Fokus-Modus).
- `assets/fonts/` — Bricolage Grotesque, Inter, JetBrains Mono (woff2).
- `SKILL.md` — agent-skill entry point.

## Caveats
- **Fonts:** Inter & JetBrains Mono match the codebase; **Bricolage Grotesque replaces Manrope** (founder decision, July 2026) — the codebase still runs on Manrope.
- **Logo & Favicon (2026):** `assets/logo.svg` + `assets/favicon.svg` — two circles connected through the child-dot, born from the start-screen animation. The earlier sources had no mark; this one was set with the founder in this project.
- Screens beyond Auth/Onboarding are vision-true mocks (the phase-0 codebase has only stubs). The 3-tab IA, Status-Ampel, Fokus-Modus and Patchwork follow the founder decisions in `design_handoff_copara/PROJECT_RULES.md`.
- The attached `Harry-Riegel/copara` repo was an empty repository — no source could be read from it.
